import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  Blacklist,
  BlacklistDocument,
  IBlacklist,
} from '@app/schemas/blacklist.schema';
import { ISession } from '@app/schemas/session.schema';
import { TOKEN_TYPE } from '@app/common/enums/jwt.enum';
import { CacheService, REDIS_KEY_PATTERNS } from '@app/shared';
import { TokenStatusResult } from './types/blacklist.type';
import { JwtConfigStrategy } from '@app/shared/jwt/jwt.strategy';

@Injectable()
export class BlacklistService extends BaseService<BlacklistDocument> {
  model_name = ENUM_MODEL.BLACKLIST;
  constructor(
    @InjectModel(Blacklist.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<BlacklistDocument>,
    @InjectModel(Blacklist.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<BlacklistDocument>,
    private readonly cacheService: CacheService,
    private readonly jwtStrategy: JwtConfigStrategy,
  ) {
    super(model, readModel);
  }

  async handleBlackListTokens(
    records: ISession[],
    types: TOKEN_TYPE[],
  ): Promise<void> {
    if (records?.length) {
      const cachePromises = [];
      const entities = records.reduce((result: IBlacklist[], record) => {
        if (types.includes(TOKEN_TYPE.BEARER)) {
          const ttl = Common.calculateTTLSeconds(
            record.access_token_expired_at,
          );
          if (ttl > 0) {
            const item: IBlacklist = {
              token: record.access_token,
              expire_at: record.access_token_expired_at,
              type: TOKEN_TYPE.BEARER,
            };
            result.push(item);
            const cacheKey = REDIS_KEY_PATTERNS.BLACKLIST(record.access_token);
            cachePromises.push(this.cacheService.set(cacheKey, true, { ttl }));
          }
        }
        if (types.includes(TOKEN_TYPE.REFRESH)) {
          const ttl = Common.calculateTTLSeconds(
            record.refresh_token_expired_at,
          );
          if (ttl > 0) {
            const item: IBlacklist = {
              token: record.refresh_token,
              expire_at: record.refresh_token_expired_at,
              type: TOKEN_TYPE.REFRESH,
            };
            result.push(item);
            const cacheKey = REDIS_KEY_PATTERNS.BLACKLIST(record.refresh_token);
            cachePromises.push(this.cacheService.set(cacheKey, true, { ttl }));
          }
        }
        return result;
      }, []);
      await this._insertMany(entities);
      const chunkPromises = _.chunk(cachePromises, 20);
      for (const chunk of chunkPromises) {
        await Promise.all(chunk);
      }
    }
  }

  public async checkTokenStatus(
    token: string,
    isVerify: boolean = true,
  ): Promise<TokenStatusResult> {
    const result: TokenStatusResult = {
      is_revoked: false,
    };
    if (isVerify) {
      result.value = await this.jwtStrategy.validate(token);
    }
    let cachedToken = false;
    try {
      const cacheKey = REDIS_KEY_PATTERNS.BLACKLIST(
        this._initializeRequestToken(token),
      );
      cachedToken = await this.cacheService.timeoutGet<boolean>(cacheKey, 1000);
    } catch (error) {
      this.logger.error(`ERROR ON GET REDIS CACHED BLACKLIST ${error}`);
      const foundToken = (await this._findOne({ token })) as IBlacklist;
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
