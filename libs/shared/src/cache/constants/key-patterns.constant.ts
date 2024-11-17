import { REDIS_NAME_ENUM } from '@app/common/enums';

const DELIMITER = ':';
const concatSubKey = (...args: string[]) =>
  [prefixKey, ...args].filter(Boolean).join(DELIMITER);

const prefixKey = REDIS_NAME_ENUM.SPONSOR_REDIS.toLowerCase();
export const REDIS_KEY_PATTERNS = {
  ACTION: {
    ERRORS_COUNT: (command, model_name, code, functionName) =>
      [prefixKey, model_name, 'ERRORS_COUNT', command, code, functionName].join(
        ':',
      ),
  },
  BLACKLIST: (token: string) =>
    [prefixKey, REDIS_NAME_ENUM.BLACKLIST, token].join(':'),
  ACCOUNT: {
    EMAIL_PASSWORD: (id: string, timestamp?: string) =>
      timestamp
        ? [prefixKey, id, 'UPDATE_PASSWORD', timestamp].join(':')
        : [prefixKey, id, 'UPDATE_PASSWORD'].join(':'),
  },
};
