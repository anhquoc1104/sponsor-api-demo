import { QUEUE_TYPE_ENUM } from './common.enum';
import '@app/shared/utils/dotenv';

export const ALL_TOPIC_NOTIFY =
  process.env.ENVIRONMENT === 'prod' ? 'SPONSOR_PRO' : 'SPONSOR_DEV';

export const ENUM_INSERT_QUEUE_FUNCTION_KEY = `${QUEUE_TYPE_ENUM.INSERT_QUEUE}-${ALL_TOPIC_NOTIFY}`;
