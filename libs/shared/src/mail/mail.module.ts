import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENT_VARIABLE } from '@app/common';
import { MailService } from './mail.service';
import { LoggerModule } from '../logger';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';
@Module({
  imports: [
    LoggerModule,
    MailerModule.forRootAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get(ENVIROMENT_VARIABLE.SMTP_HOST),
          port: configService.get(ENVIROMENT_VARIABLE.SMTP_PORT),
          secure: true,
          auth: {
            user: configService.get(ENVIROMENT_VARIABLE.SMTP_USER),
            pass: configService.get(ENVIROMENT_VARIABLE.SMTP_PASSWORD),
          },
        },
        defaults: {
          from: configService.get(ENVIROMENT_VARIABLE.SMTP_DEFAULT_EMAIL),
        },
        template: {
          adapter: new HandlebarsAdapter(),
          dir: resolve('libs/templates'),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
