import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import {
  Blacklist,
  BlacklistDocument,
  IBlacklist,
} from '@app/schemas/blacklist.schema';
import { CacheService, REDIS_KEY_PATTERNS } from '@app/shared';
import { TokenStatusResult } from './types/blacklist.type';
import { UserDocument } from '@app/schemas';

export enum CONNECTION_NAME {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

@Injectable()
export class AuthConfigStrategy {
  logger = new Logger(AuthConfigStrategy.name);
  constructor(
    @InjectModel(Blacklist.name, CONNECTION_NAME.PRIMARY)
    public readonly blacklistModel: Model<BlacklistDocument>,
    @InjectModel(Blacklist.name, CONNECTION_NAME.PRIMARY)
    public readonly userModel: Model<UserDocument>,
    private readonly cacheService: CacheService,
  ) {}

  public async checkTokenStatus(token: string): Promise<TokenStatusResult> {
    const result: TokenStatusResult = {
      is_revoked: false,
    };
    let cachedToken = false;
    token = this._initializeRequestToken(token);
    try {
      const cacheKey = REDIS_KEY_PATTERNS.BLACKLIST(token);
      cachedToken = await this.cacheService.timeoutGet<boolean>(cacheKey, 1000);
    } catch (error) {
      this.logger.error(`ERROR ON GET REDIS CACHED BLACKLIST ${error}`);
      const foundToken = (await this.blacklistModel.findOne({
        token,
      })) as IBlacklist;
      this.logger.log(`FIND TOKEN IN DB BLACKLIST`);
      result.is_revoked = !foundToken ? false : true;
      return result;
    }
    result.is_revoked = !cachedToken ? false : true;
    return result;
  }

  _initializeRequestToken(authorization: string): string {
    return authorization?.indexOf('Bearer') != -1
      ? authorization?.split(' ')[1]
      : authorization;
  }
}
