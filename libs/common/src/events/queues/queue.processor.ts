import { Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { ENUM_INSERT_QUEUE_FUNCTION_KEY } from '@app/common';
import { I18nService } from 'nestjs-i18n';

@Processor(ENUM_INSERT_QUEUE_FUNCTION_KEY)
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);
  @Inject()
  i18n: I18nService;
}
