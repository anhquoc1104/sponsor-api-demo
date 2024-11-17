import { Cache } from 'cache-manager';
import { LoggerService } from '@nestjs/common';
import * as _ from 'lodash';
import { replacer } from '@app/shared';
import '@app/shared/utils/dotenv';
import {
  ENUM_MODEL,
  ENUM_REDIS_FUNCTION_KEY,
  ENUM_REDIS_TYPE,
  REDIS_NAME_ENUM,
  TIME_IN_SECONDS,
} from '../enums';
import { Common } from '@app/common/functions';

export async function generateCacheKey(
  query: any,
  model_name: ENUM_MODEL,
  function_name: ENUM_REDIS_FUNCTION_KEY,
): Promise<string> {
  if (model_name == null) {
    return `${REDIS_NAME_ENUM.SPONSOR_REDIS}:`.toLocaleLowerCase();
  }
  const keyValuePair = Object.entries(Common.detectNullToObject(query));
  // Sort before calculating to make sure that the order of the query parameter is not matter
  keyValuePair.sort((first, second) => (first[0] < second[0] ? -1 : 1));
  let key_name = '';
  for (let [key, value] of keyValuePair) {
    if (typeof value == 'object') {
      value = JSON.stringify(value, replacer);
    }
    key_name += (key_name ? '&' : '') + `${key}=${value}`;
  }
  const companyName = query.company ? '-' + query.company : '';
  return `${REDIS_NAME_ENUM.SPONSOR_REDIS}:${model_name}-${function_name}${companyName}-${key_name}`.toLocaleLowerCase();
}

export async function setKey(
  cache_manager: Cache,
  key: string = undefined,
  value: any,
  logger: LoggerService,
  ttl?: number,
): Promise<boolean> {
  if (!key) return undefined;
  if (!ttl) {
    ttl =
      Number(process.env.TTL_KEY_CACHE_SECOND) ||
      Number(TIME_IN_SECONDS.FIVE_MINUTE);
  }
  logger.log(`setKey->key: ${key}, ttl: ${ttl}`);
  try {
    await cache_manager.set(key, JSON.stringify(value), ttl);
    return true;
  } catch (error) {
    logger.error(`setKey->message: ${error.message}`);
  }
  return undefined;
}

export async function getKey(
  cache_manager: Cache,
  key: string = undefined,
  logger: LoggerService,
): Promise<any> {
  logger.debug(`getKey->key: ${key}`);
  if (!key) return undefined;
  try {
    const result: any = await cache_manager.get(key);
    return result ? JSON.parse(result) : undefined;
  } catch (error) {
    logger.error(`getKey->message: ${error.message}`);
  }
  return undefined;
}

export async function generateSettingCacheKey(
  query: any,
  model_name: ENUM_MODEL,
  function_name: ENUM_REDIS_FUNCTION_KEY,
): Promise<string> {
  if (model_name == null) {
    return `${REDIS_NAME_ENUM.SPONSOR_REDIS}:`.toLocaleLowerCase();
  }
  let key_name = '';
  if (query.key) {
    key_name = '-' + query.key;
  } else if (query.keys) {
    key_name = '-' + query.keys.sort().toString();
  }
  const methodName = query.cache_method_name
    ? '-' + query.cache_method_name
    : '';
  const objectType = query.object_type ? '-' + query.object_type : '';
  return `${REDIS_NAME_ENUM.SPONSOR_REDIS}:${model_name}-${function_name}${methodName}${objectType}${key_name}`.toLocaleLowerCase();
}

// export async function removeCache(
//   cache_manager: any,
//   pattern: string,
//   logger: LoggerService,
// ): Promise<any> {
//   try {
//     pattern = pattern + '*';
//     const scanner = new redisScan(cache_manager.store.getClient());
//     scanner.scan(pattern, async (err, matchingKeys) => {
//       if (err) throw err;
//       const delPromises = matchingKeys.map((key) => {
//         logger.debug('removeCache->key', key);
//         cache_manager.del(key);
//       });
//       await Promise.all(delPromises);
//     });
//     return true;
//   } catch (error) {
//     logger.error(`removeCache->message: ${error.message}`);
//   }
//   return undefined;
// }

// export async function cacheProcessData(
//   condition: any,
//   cache_manager: Cache,
//   logger: LoggerService,
//   model: ENUM_MODEL,
//   function_key: ENUM_REDIS_FUNCTION_KEY,
//   type_cache: ENUM_REDIS_TYPE, // loại xử lý cache
//   data = null, // giá trị được lưu cache
//   global_value = false, // giá trị lấy chung
//   ttl: number = 0,
// ): Promise<any> {
//   try {
//     let redis_key;
//     if (global_value) {
//       delete condition.user;
//       delete condition.user_area_group;
//       delete condition.user_roles;
//     }
//     if (
//       model == ENUM_MODEL.SETTING &&
//       (condition.cache_method_name === 'findMultipleValueByKey' ||
//         condition.cache_method_name === 'findValueByKey')
//     ) {
//       redis_key = await generateSettingCacheKey(condition, model, function_key);
//     } else {
//       redis_key = await generateCacheKey(condition, model, function_key);
//     }
//     logger.log(
//       `cacheProcessData->redis_key: ${redis_key}, model: ${model}, function_key: ${function_key}, type_cache: ${type_cache}`,
//     );
//     if (!redis_key) return undefined;
//     if (type_cache === ENUM_REDIS_TYPE.GET) {
//       const cache_data = await getKey(cache_manager, redis_key, logger);
//       if (cache_data) {
//         return Common.convertParamsToObjectId(cache_data);
//       }
//       return cache_data;
//     } else if (type_cache === ENUM_REDIS_TYPE.SET) {
//       if (data !== undefined) {
//         return await setKey(cache_manager, redis_key, data, logger, ttl);
//       } else {
//         return await removeCache(cache_manager, redis_key, logger);
//       }
//     } else if (type_cache === ENUM_REDIS_TYPE.DELETE) {
//       // if (_.isEmpty(condition)) {
//       //   redis_key = redis_key + '*';
//       // }
//       return await removeCache(cache_manager, redis_key, logger);
//     }
//   } catch (error) {
//     logger.error(`cacheProcessData->message: ${error.message}`);
//   }
//   return undefined;
// }
