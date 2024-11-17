import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ParseIntPipe,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import * as path from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggerModule } from './logger/logger.module';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { ValidateObjectIdPipe } from './pipes/validate-object-id.pipes';
import { EmptyPipe } from './pipes/empty.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { GlobalHttpModule } from './http.module';
import { ConfigDynamicModule } from './config/config.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENT_VARIABLE } from '@app/common/enums/enviroment.enum';
import { I18nDynamicModule } from './i18n';
import { JwtConfigModule } from './jwt/jwt-config.module';
import { LoggerService } from './logger';
import { AuthGuard } from './guards/auth.guard';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigDynamicModule,
    TelegramModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        botKey: config.get(ENVIROMENT_VARIABLE.TELEGRAM_BOT_ID),
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    GlobalHttpModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    I18nDynamicModule.forRoot({ path: path.resolve('i18n') }),
    JwtConfigModule,
    MailModule,
  ],
  providers: [
    LoggerService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ParseIntPipe,
    },
    {
      provide: APP_FILTER,
      useClass: EmptyPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ValidateObjectIdPipe,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [LoggerService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
