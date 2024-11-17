import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  TELEGRAM_OPTIONS_TOKEN,
  TelegramConfig,
  TelegramMessageError,
} from './telegram.interface';
import * as TelegramBot from 'node-telegram-bot-api';
@Injectable()
export class TelegramService extends TelegramBot {
  private _logger = new Logger(this.constructor.name);
  constructor(@Inject(TELEGRAM_OPTIONS_TOKEN) options: TelegramConfig) {
    super(options.botKey);
  }

  public async customMessage(payload: {
    text: string;
    chatId: number | string;
    threadId: number;
  }) {
    try {
      await this.sendMessage(payload.chatId, payload.text, {
        reply_to_message_id: payload.threadId,
      });
      this._logger.log(`SEND MESSAGE TO TELEGRAM SUCCESSFULLY`);
    } catch (error) {
      const telegramErr: TelegramMessageError = error.response.body;
      this._logger.error(
        `ERROR ON MESSAGING TO TELEGRAM ${JSON.stringify(telegramErr)}`,
      );
    }
  }
}
