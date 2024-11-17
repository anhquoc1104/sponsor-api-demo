import { ModuleMetadata, Type } from '@nestjs/common';

export type TelegramConfig = {
  botKey: string;
};

export interface TelegramModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<TelegramConfig>;
  useExisting?: Type<TelegramConfig>;
  useFactory?: (...args: any[]) => Promise<TelegramConfig> | TelegramConfig;
}

export const TELEGRAM_OPTIONS_TOKEN = 'TelegramOptionsToken';
export type TelegramMessageError = {
  ok: boolean;
  error_code: number;
  description: string;
};
