import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as lodash from 'lodash';
import { REDIS_KEY_PATTERNS } from './constants/key-patterns.constant';
import { convertValueToNumber, isJsonString, typeOf } from '@app/shared/utils';
import { ENUM_MODEL } from '@app/common/enums';

@Injectable()
export class CacheService implements OnModuleInit {
  logger = new Logger(CacheService.name);
  client: Cache;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  onModuleInit() {
    this.client = this.cacheManager;
  }

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async mGet(...args: string[] | any): Promise<Record<string, any>> {
    const mGetData = await this.cacheManager.store.mget(...args.flat(1));
    return mGetData.reduce((prevVal, curVal: any, i) => {
      prevVal[args.flat(1)[i]] = isJsonString(curVal)
        ? JSON.parse(curVal)
        : curVal;
      return prevVal;
    }, {});
  }

  async set(key: string, value: any, options?: CachingConfig<any>) {
    this.logger.log('************ CacheSet ***************');
    return await this.cacheManager.set(key, value, options);
  }

  async mSet(
    mData: Array<Record<string, any>> | Record<string, any>,
    ttl: number = 3600,
  ) {
    const mSetValue: any = this.mSetValue(mData);
    return await this.cacheManager.store.mset(mSetValue);
  }

  async keys(...args: string[]): Promise<string[]> {
    return this.cacheManager.store.keys(...args.flat(1));
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }

  mSetValue(
    mData: Array<Record<string, any>> | Record<string, any>,
  ): Array<string> {
    if (typeOf(mData) === 'array') {
      const mDataConvert = mData.map((item) => {
        const [key] = lodash.keys(item);
        const value = JSON.stringify(item[key]);
        return { [key]: value };
      });

      return mDataConvert.flatMap(Object.entries).flat(1);
    }
    return Object.entries(mData).reduce((result, [key, val]: [string, any]) => {
      result.push(key);
      result.push(JSON.stringify(val));
      return result;
    }, []);
  }

  async handleToQueueIncreaseActionCacheErrorCount(
    command: string,
    model_name: ENUM_MODEL,
    code: string,
    functionName: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(
      command,
      model_name,
      code,
      functionName,
    );
    const data: any = await this.cacheManager.get(cacheKey);
    const errorCount = convertValueToNumber(data?.count) + 1;
    await this.cacheManager.set(cacheKey, { count: errorCount }, 900);
    return errorCount;
  }

  async handleCleanRelatedActionCacheToQueue(
    command: string,
    model_name: ENUM_MODEL,
    code: string,
    functionName: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(
      command,
      model_name,
      code,
      functionName,
    );
    await this.cacheManager.del(cacheKey);
  }

  public async timeoutSet<T>(
    key: string,
    value: T,
    ttlSec: number,
    msTimeout: number,
  ) {
    return Promise.race([
      this.set(key, value, { ttl: ttlSec }),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject('SET REDIS TIMEOUT');
        }, msTimeout),
      ),
    ]);
  }

  public async timeoutGet<T>(key: string, msTimeout: number): Promise<T> {
    const cachedValue = Promise.race([
      this.get(key),
      new Promise((_, reject) =>
        setTimeout(() => {
          return reject(`GET REDIS TIMEOUT - KEY ${key}`);
        }, msTimeout),
      ),
    ]);
    if (typeof cachedValue === 'string') {
      return JSON.parse(cachedValue) as T;
    }
    return cachedValue as T;
  }

  async getKeysByKeyword(keyword: string): Promise<[any]> {
    const now = Date.now();
    this.logger.log(
      `************ Cache Get Keys With Keyword: ${keyword}***************`,
    );
    const value = await this.cacheManager.store.keys(keyword);
    this.logger.log(
      `************ Cache Get Keys With Keyword After: ${Date.now() - now}ms***************`,
    );
    return value;
  }
}
