import '@app/shared/utils/dotenv';

export enum ENUM_STATUS {
  EXPIRED = 'EXPIRED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INIT = 'INIT',
}

export enum CONNECTION_NAME {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export enum LOG_ACTION {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  UPDATE_STATUS = 'UPDATE_STATUS',
}

export enum RESPONSE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  UPDATE_STATUS = 'UPDATE_STATUS',
  GET = 'GET',
}

export enum ENUM_RESOURCE_SYSTEM {
  CLIENT_WEB = 'CLIENT_WEB',
  ADMIN_WEB = 'ADMIN_WEB',
  PUBLISHER_WEB = 'PUBLISHER_WEB',
  SYSTEM = 'SYSTEM',
}

export enum EVENT_EMITTER_ENUM {
  UPDATE = '.update',
  LOGIN = '.login',
  SAVE_ACTION_HISTORY = '.saveActionHistory',
  CREATED = '.created',
}

export enum ENUM_VALIDATION_ACTION_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  UPDATE_STATUS = 'UPDATE_STATUS',
  DELETE = 'DELETE',
}

export enum ENUM_TYPE_VARIABLE {
  STRING = 'STRING',
  NUMER = 'NUMER',
  BOOLEAN = 'BOOLEAN',
  OBJECT = 'OBJECT',
  ARRAY_OBJECT = 'ARRAY_OBJECT',
  ARRAY = 'ARRAY',
}

export enum ENUM_CURRENCY_UNIT {
  VND = 'VND',
  USD = 'USD',
}

export enum ENUM_POPULATE {
  USER = 'avatar name code phone email roles status',
  ROLE = 'code name',
  MASTER_DATA = '_id code name',
}

export const ENUM_POPULATE_AGGREGATE = {
  USER: {
    avatar: 1,
    name: 1,
    code: 1,
    title: 1,
    phone: 1,
    email: 1,
    roles: 1,
    status: 1,
  },

  ROLE: { code: 1, name: 1 },

  MASTER_DATA: {
    type: 1,
    code: 1,
    name: 1,
    status: 1,
    parent: 1,
  },

  ATTRIBUTE_COMMON: {
    name: 1,
    code: 1,
    image: 1,
    description: 1,
  },
};

export enum ENUM_GLOBAL_VARIABLE {
  resource_system_name = 'resource_system_name',
}

export enum QUEUE_CONFIG_KEY_ENUM {
  SPONSOR_CONFIG = 'sponsor-config',
}

export enum REDIS_NAME_ENUM {
  SPONSOR_REDIS = 'sponsor-redis',
  BLACKLIST = 'blacklist',
}

export enum QUEUE_TYPE_ENUM {
  INSERT_QUEUE = 'sponsor-insert-queue',
}

export enum TIME_IN_SECONDS {
  FIVE_MINUTE = 300,
  TEN_MINUTE = 600,
  FIVE_HOUR = 18000,
}

export enum ENUM_DATE_FORMAT {
  TIMEZONE_07 = '+07',
}

export enum SOCKET_EVENT_TYPE_ENUM {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  MESSAGE = 'MESSAGE',
  ALL_MESSAGES = 'ALL_MESSAGES',
}

export enum ENUM_NOTIFY {
  INIT = 'INIT',
  PROCESSING = 'PROCESSING',
  SENT = 'SENT',
  FAIL = 'FAIL',
}

export enum ENUM_NOTIFY_SEND_TYPE {
  ALL = 'ALL',
  USER = 'USER',
  ROLE = 'ROLE',
}

export enum ENUM_NOTIFY_TYPE {
  ALL = 'ALL',
  NORMAL = 'NORMAL',
  NEWS = 'NEWS',
  SYSTEM = 'SYSTEM',
  CHAT = 'CHAT',
}

export enum ENUM_NOTIFY_DISPLAY_TYPE {
  NORMAL = 'NORMAL',
  TOP = 'TOP',
}

export enum ENUM_SCOPE {
  BROWSE = 'BROWSE',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  READ = 'READ',
  UPDATE = 'UPDATE',
  UPDATE_STATUS = 'UPDATE_STATUS',
}

export enum ENUM_KPI_UNIT {
  MONEY = 'đ',
  TIME = 'Giờ',
  WEIGHT = 'Kg',
  PERCENT = '%',
}

export enum ENUM_DATE_TIME {
  HHmmDDMMYYYY = 'HH:mm DD-MM-YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYYMMDDHHMMSS = 'YYYYMMDDHHmmss',
  DDMMYYYYHHmmss = 'DDMMYYYYHHmmss',
  START_OFFSET = 'T00:00:00.000+07:00',
  END_OFFSET = 'T23:59:59.999+07:00',
  YYYY_MM_DD_TIMEZONE = 'YYYY-MM-DD HH:mm:ss+07:00',
  TIME_OFFSET = '+07:00',
}

export enum VERSION_API_INFO {
  VERSION = '0.0.1',
}

export enum ENUM_MONGO_OPERATOR {
  ADD_TO_SET = 'ADD_TO_SET',
  PUSH = 'PUSH',
  PULL = 'PULL',
  NORMAL = 'NORMAL',
  UNSET = 'UNSET',
}
