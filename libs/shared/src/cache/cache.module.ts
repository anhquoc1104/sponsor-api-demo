import { DynamicModule, Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import redisConfig from '../config/redis.config';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheDynamicModule {
  static register(isGlobal = true, ttl = 3600): DynamicModule {
    return {
      module: CacheDynamicModule,
      imports: [
        CacheModule.registerAsync<RedisClientOptions>({
          imports: [ConfigModule.forRoot({ load: [redisConfig] })],
          isGlobal,
          useFactory: (configService: ConfigService) => ({
            store: redisStore as unknown as CacheStore,
            url: configService.get<string>('redis.url'),
            password: configService.get<string>('redis.password') ?? undefined,
            ttl,
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
