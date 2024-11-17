import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as moment from 'moment';
// import { CacheService } from '@app/shared/cache/cache.service';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';
import { DisplayStatus } from '@app/modules/sponsor/enums';
import { NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS } from '@app/modules/sponsor/constants';
import { Common } from '@app/common';

@Injectable()
export class SponsorSchedulerService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly sponsorService: SponsorService,
    // private readonly cacheService: CacheService,
  ) {}

  async onModuleInit() {
    // Khôi phục cron jobs từ Redis cache
    // const restoredFromRedis = await this.restoreCronJobs();

    // Nếu không khôi phục được từ Redis, thì mới truy vấn cơ sở dữ liệu để khôi phục
    // if (!restoredFromRedis) {
    try {
      // Lấy tất cả các sponsor có ngày hết hạn
      const sponsors = await this.sponsorService.findSponsorsWithExpiration();

      if (!sponsors || sponsors.length === 0) {
        this.logger.log(
          'No sponsors with expiration dates found in the database.',
        );
        return;
      }

      for (const sponsor of sponsors) {
        const expireDate: Date = sponsor.sponsorship_expiration_date;

        // Kiểm tra nếu ngày hết hạn vẫn còn trong tương lai
        if (expireDate && moment().isBefore(expireDate)) {
          // Set lại cron job cho sponsor này
          this.setSponsorCronJobs(sponsor, { isOnlyRemove: false });
        }
      }

      this.logger.log('Cron jobs restored from the database.');
    } catch (error) {
      this.logger.error(
        'Failed to restore cron jobs from database:',
        this.logger.log(error.message),
      );
    }
    // Logs cron name
    // const cronJobs = this.schedulerRegistry.getCronJobs();
    // console.log('Array.from(cronJobs.keys());', Array.from(cronJobs.keys()));

    // }
  }

  async setSponsorCronJobs(
    sponsor: any,
    payload: { isOnlyRemove: boolean },
  ): Promise<boolean> {
    try {
      const number_change_leaving_to_expired =
        NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS || 15;
      const expireDate = new Date(
        Common.getLocalOffset(sponsor.sponsorship_expiration_date),
      );
      if (!expireDate) {
        this.logger.warn(
          `Sponsor ${sponsor.sponsor_name} - ${sponsor._id} has no expiration date.`,
        );
        return false;
      }
      // Xóa các cron jobs cũ
      await this.deleteEventCronJobs(sponsor?._id?.toString());
      if (!payload.isOnlyRemove) {
        // Tạo cron job để chuyển sang trạng thái "LEAVING"
        const leavingDate = moment(Common.getLocalOffset(expireDate))
          .subtract(number_change_leaving_to_expired, 'days')
          .toDate();
        if (
          [DisplayStatus.LISTED, DisplayStatus.LEAVING].includes(
            sponsor.display_status,
          )
        ) {
          if (moment().isBefore(leavingDate)) {
            await this.createCronJob(
              this.getEventCronName(DisplayStatus.LEAVING, sponsor._id),
              leavingDate,
              async () => {
                await this.sponsorService._updateOne(
                  { _id: sponsor._id },
                  {
                    display_status: DisplayStatus.LEAVING,
                  },
                );
              },
            );
            this.logger.log(
              `Cron job for LEAVING::: at ${moment(leavingDate)} - ${sponsor.sponsor_name} - ${sponsor._id}`,
            );
          }

          // Tạo cron job để chuyển sang trạng thái "EXPIRED"
          if (moment().isBefore(expireDate)) {
            await this.createCronJob(
              this.getEventCronName(DisplayStatus.EXPIRED, sponsor._id),
              expireDate,
              async () => {
                await this.sponsorService._updateOne(
                  { _id: sponsor._id },
                  {
                    display_status: DisplayStatus.EXPIRED,
                    priority: null,
                  },
                );
              },
            );
            this.logger.log(
              `Cron job for EXPIRED::: at ${moment(expireDate)} -  ${sponsor.sponsor_name} - ${sponsor._id}`,
            );
          }
        }
      }
      return true;
    } catch (error) {
      this.logger.error(error?.message, error?.stack);
      return false;
    }
  }

  private async createCronJob(
    name: string,
    date: Date,
    callback: () => void,
  ): Promise<void> {
    const job = new CronJob(date, async () => {
      await callback();
      // await this.deleteCronJobFromCache(name); // Xóa cron job khỏi cache sau khi thực hiện
      this.schedulerRegistry.deleteCronJob(name);
      this.logger.log(`Cron job ${name} executed and removed.`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    // Lưu thông tin cron job vào cache
    // this.saveCronJobToCache(name, date);
  }

  private getEventCronName(type: string, sponsor_id: string): string {
    return `${type}-${sponsor_id}`;
  }

  private async deleteEventCronJobs(sponsor_id: string): Promise<void> {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    if (cronJobs?.size) {
      const jobNames = Array.from(cronJobs.keys());
      for (const jobName of jobNames) {
        if (jobName.includes(sponsor_id)) {
          try {
            this.schedulerRegistry.deleteCronJob(jobName);
            this.logger.log(`Deleted cron job: ${jobName}`);
          } catch (error) {
            this.logger.error(
              `Failed to delete cron job ${jobName}: ${error.message}`,
              error.stack,
            );
          }
        }
      }
    }
  }

  // private async saveCronJobToCache(name: string, date: Date): Promise<void> {
  //   await this.cacheService.set(
  //     `scheduler_sponsor:${name}`,
  //     JSON.stringify({ name, date }),
  //   );
  // }

  // private async deleteCronJobFromCache(name: string): Promise<void> {
  //   await this.cacheService.del(`scheduler_sponsor:${name}`);
  // }

  // async restoreCronJobs(): Promise<boolean> {
  //   const keys = await this.cacheService.keys('scheduler_sponsor:*');
  //   if (keys.length === 0) {
  //     this.logger.log('No cron jobs found in Redis.');
  //     return false;
  //   }

  //   for (const key of keys) {
  //     const jobData = await this.cacheService.get(key);
  //     const job = JSON.parse(jobData);
  //     const display_status = job.name?.split('-')[0]?.toUpperCase();
  //     const sponsor_id = job.name?.split('-')[1]?.toUpperCase();
  //     if (!display_status || moment().isAfter(job.date)) {
  //       this.deleteCronJobFromCache(job.name); // Xóa cron job đã hết hạn khỏi cache
  //       return;
  //     }

  //     this.createCronJob(job.name, new Date(job.date), async () => {
  //       await this.sponsorService._updateOne({ _id: sponsor_id }, {
  //         display_status: display_status,
  //       });
  //     });
  //   }
  //   this.logger.log('Cron jobs restored from Redis.');
  //   return true;
  // }
}
