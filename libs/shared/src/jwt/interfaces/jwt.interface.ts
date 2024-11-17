import { ACCOUNT_TYPE } from '@app/common';
import { TOKEN_TYPE } from '@app/common/enums/jwt.enum';

export interface ITokenGenerateResponse {
  access_token: string;
  refresh_token?: string;
}

export interface IAccessTokenPayload {
  sub: string;
  username: string;
  email: string;
  email_verified: boolean;
  permissions?: string[];
  account_type: ACCOUNT_TYPE;
  typ: TOKEN_TYPE;
}

export interface IRefreshTokenPayload
  extends Pick<IAccessTokenPayload, 'typ' | 'sub'> {}
