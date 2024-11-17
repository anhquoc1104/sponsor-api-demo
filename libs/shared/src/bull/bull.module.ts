import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { BullDynamicModuleOptions } from './interfaces/bull-dynamic-module-options.interface';
import { ConfigService } from '@nestjs/config';

@Module({})
export class BullDynamicModule {
  static forRootAsync({ configKey }: BullDynamicModuleOptions): DynamicModule {
    return {
      module: BullDynamicModule,
      imports: [
        BullModule.forRootAsync(configKey, {
          useFactory: (configService: ConfigService) => ({
            redis: {
              host: configService.get<string>('REDIS_HOST') ?? 'localhost',
              port: Number(configService.get<string>('REDIS_PORT')) ?? 6379,
              password:
                configService.get<string>('REDIS_PASSWORD') ?? undefined,
            },
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [BullModule],
    };
  }

  static registerQueue(options) {}
}
