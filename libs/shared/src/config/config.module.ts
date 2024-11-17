import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config.validation';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(
          `config/.env.${process.env.NODE_ENV || process.env.ENVIRONMENT}`,
        ),
      ],
      isGlobal: true,
      validate,
    }),
  ],
  exports: [],
  providers: [],
})
export class ConfigDynamicModule {}
