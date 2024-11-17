import {
  Controller,
  Logger,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Get,
  ValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { SponsorSchedulerService } from './sponsor-scheduler.service';
import { BaseController } from '@app/common';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Unprotected } from '@app/shared';
@Controller('schedules')
export class SponsorSchedulerController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  constructor(
    private SponsorSchedulerService: SponsorSchedulerService,
    private sponsorService: SponsorService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    super();
  }

  @Post('set-cron-jobs/:sponsorId')
  @Unprotected()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async setSponsorCronJobs(
    @Param('sponsorId') sponsorId: string,
    @Body() payload: { isOnlyRemove: boolean },
  ): Promise<void> {
    try {
      const sponsor = await this.sponsorService.findById(sponsorId);

      if (!sponsor) {
        throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
      }
      const result = await this.SponsorSchedulerService.setSponsorCronJobs(
        sponsor,
        payload,
      );
      if (result) {
        this.logger.log(`Cron jobs set for sponsor ${sponsorId}`);
      } else {
        this.logger.warn(`Failed to set cron jobs for sponsor ${sponsorId}`);
      }
    } catch (error) {
      this.logger.error(
        `Error setting cron jobs for sponsor ${sponsorId}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to set cron jobs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
