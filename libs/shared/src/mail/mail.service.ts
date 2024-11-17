import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: LoggerService,
  ) {}

  async sendMessageForUserMail(payload: ISendMailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail({
        ...payload,
        attachments: [
          {
            filename: 'logo-the-sponsor.png',
            path: './files/logo-the-sponsor.png',
            cid: 'logo_the_sponsor',
          },
        ],
      });
    } catch (error) {
      this.logger.error(
        `sendMessageForUserMail=>ROOT CAUSE: ${JSON.stringify(
          error?.message ?? error,
        )}`,
      );
    }
  }
}
