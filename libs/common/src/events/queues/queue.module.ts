import { Module } from '@nestjs/common';
import { QueueProcessor } from './queue.processor';
import { BullModule } from '@nestjs/bull';
import {
  QUEUE_CONFIG_KEY_ENUM,
  ENUM_INSERT_QUEUE_FUNCTION_KEY,
} from '@app/common';

@Module({
  imports: [
    BullModule.registerQueue({
      configKey: QUEUE_CONFIG_KEY_ENUM.SPONSOR_CONFIG,
      name: ENUM_INSERT_QUEUE_FUNCTION_KEY,
    }),
  ],
  providers: [QueueProcessor],
  exports: [QueueProcessor],
})
export class QueueModule {}
