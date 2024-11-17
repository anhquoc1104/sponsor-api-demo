import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  TelegramModuleOptions,
  TELEGRAM_OPTIONS_TOKEN,
} from './telegram.interface';
import { TelegramService } from './telegram.service';

@Global()
@Module({})
export class TelegramModule {
  public static forRootAsync(options: TelegramModuleOptions): DynamicModule {
    return {
      module: TelegramModule,
      providers: [
        {
          provide: TELEGRAM_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        TelegramService,
      ],
      imports: options.imports,
      exports: [TelegramService],
    };
  }
}
