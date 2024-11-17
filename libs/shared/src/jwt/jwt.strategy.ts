import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_ERROR_MESSAGE, TOKEN_TYPE } from '@app/common/enums/jwt.enum';
import { throwErrorMessage } from '../filters';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  ITokenGenerateResponse,
} from './interfaces/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENT_VARIABLE } from '@app/common/enums/enviroment.enum';
import { IUser } from '@app/schemas';
import { ACCOUNT_TYPE } from '@app/common';
@Injectable()
export class JwtConfigStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(
    token: string,
  ): Promise<IAccessTokenPayload | IRefreshTokenPayload> {
    try {
      if (!token) {
        throwErrorMessage(
          { error_code: ERROR_CODE.AUTH.UNAUTHORIZED },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return await this.jwtService.verify(this._initializeRequestToken(token));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error?.message) {
        switch (error.message) {
          case JWT_ERROR_MESSAGE.EXPIRED:
          case JWT_ERROR_MESSAGE.INVALID_TOKEN:
          case JWT_ERROR_MESSAGE.INVALID_PUBLIC_KEY:
            throwErrorMessage(
              { error_code: ERROR_CODE.AUTH.UNAUTHORIZED },
              HttpStatus.UNAUTHORIZED,
            );
        }
      }
    }
  }

  async handleInitTokens(user: IUser): Promise<ITokenGenerateResponse> {
    const accessTokenPayload: IAccessTokenPayload = {
      sub: user._id as string,
      username: user.username,
      email: user?.email || '',
      email_verified: false,
      account_type: user.type as ACCOUNT_TYPE,
      typ: TOKEN_TYPE.BEARER,
      permissions: user?.permissions,
    };

    const refreshTokenPayload: IRefreshTokenPayload = {
      sub: user._id as string,
      typ: TOKEN_TYPE.REFRESH,
    };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: this.configService.get(
          ENVIROMENT_VARIABLE.JWT_REFRESH_TOKEN_EXPIRE,
        ),
      }),
    };
  }

  async handleRefreshToken(user: IUser): Promise<ITokenGenerateResponse> {
    const accessTokenPayload: IAccessTokenPayload = {
      sub: user._id as string,
      username: user.username,
      email: user?.email || '',
      email_verified: false,
      account_type: user.type as ACCOUNT_TYPE,
      typ: TOKEN_TYPE.BEARER,
      permissions: user?.permissions,
    };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
    };
  }

  _initializeRequestToken(authorization: string): string {
    return authorization?.indexOf('Bearer') != -1
      ? authorization?.split(' ')[1]
      : authorization;
  }
}
