export enum JWT_ERROR_MESSAGE {
  EXPIRED = 'jwt expired',
  INVALID_TOKEN = 'invalid signature',
  INVALID_PUBLIC_KEY = 'secretOrPublicKey must be an asymmetric key when using RS256',
}

export enum TOKEN_TYPE {
  BEARER = 'Bearer',
  REFRESH = 'Refresh',
}

const HOUR = 60 * 60;
const DAY = HOUR * 24;
const MINUTE = 60;
export enum CACHE_TTL {
  USER_INFO = HOUR * 5,
  BUSINESS_ORG_INFO = DAY,
  DETAIL = DAY * 7,
  AUTHENTICATE = 2 * MINUTE,
  EMAIL = DAY,
  REQUEST_UPDATE_PASSWORD = 5 * MINUTE,
  ROLE = 5 * HOUR,
  ORGANIZATION = 5 * MINUTE,
  BUSINESS_TYPE = 5 * MINUTE,
  STABLE = 0,
  RELATED_AUTHENTICATE = 2 * DAY,
  DDOS = 30,
  MENU_FRAME = 7 * DAY,
}

export enum BACKUP_CACHE_TTL {
  DEFAULT = 2000,
  RELATED_AUTHENTICATE = 5000,
}
