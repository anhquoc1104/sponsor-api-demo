import { Logger } from '@nestjs/common';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { io } from 'socket.io-client';
import * as _ from 'lodash';
import { PipelineStage } from 'mongoose';
import * as crypto from 'crypto';
import { ENUM_DATE_TIME, ENUM_MODEL, SOCKET_EVENT_TYPE_ENUM } from './enums';
import { SocketParamsInterface } from './interfaces/socket.interface';
import '@app/shared/utils/dotenv';
import { isMongoId } from 'class-validator';
import { fromSinceIntervals } from './constants/datetime.constant';
import {
  ENUM_BASE_FIND_CONVERT_TYPE,
  IBaseBetweenPastAndCurrent,
  IBaseFindConditonNoKeywordOptionResponse,
  ISelectAfterQuery,
  IVietnameseAnalysis,
} from './interfaces';
import {
  LOWERCASE_VIETNAMESE_TEXTS,
  UPPERCASE_VIETNAMESE_TEXTS,
} from './constants/language.constant';

const characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
const charactersLength = characters?.length;

export class Common {
  static logger: Logger = new Logger('Common');

  static _conditionFindAll(payload: {
    query: any;
    condition_fields?: (keyof IBaseFindConditonNoKeywordOptionResponse)[];
  }): {
    condition: any;
    condition_option: IBaseFindConditonNoKeywordOptionResponse;
    condition_keyword: any;
    sort: any;
    select_after_query: ISelectAfterQuery;
  } {
    const query = payload.query;
    const condition = {};
    const condition_option: IBaseFindConditonNoKeywordOptionResponse =
      Common._conditionOption(query);
    const condition_keyword = Common._conditionKeyWord(query);
    const select_after_query: ISelectAfterQuery =
      Common._selectAfterQuery(query);

    // search with key field
    if (
      _.isArray(payload.condition_fields) &&
      payload.condition_fields.length > 0
    ) {
      Object.keys(condition_option).forEach(
        (e: keyof IBaseFindConditonNoKeywordOptionResponse) => {
          if (payload.condition_fields.includes(e)) {
            condition[e] = condition_option[e];
          }
        },
      );
    }

    let sort: any = { updated_at: -1 /* _id: -1 */ }; // Remove sort by _id for improve perfermance
    if (query?.sort_name && query?.sort_type) {
      sort = Common._sortConverter(query);
    }

    return {
      condition,
      condition_option,
      condition_keyword,
      sort,
      select_after_query,
    };
  }

  static _conditionKeyWord(query: any): any {
    const condition_keyword: any = {};
    if (query.keyword && query.keyword_params) {
      // condition_keyword.$text = {$search: query.keyword.trim()};
      const makeTextFilter = (text) => {
        const wordSplited = text?.split(/\s+/);
        /** Regex generation for words */
        const regToMatch = new RegExp(wordSplited.join('|'), 'gi');
        const filter = [];
        const array = query?.keyword_params?.split(',');
        array.map((item, i) => {
          filter.push({});
          filter[i][item] = {
            $regex: regToMatch,
            // $options: 'i',
          };
        });
        return filter;
      };
      condition_keyword.$or = makeTextFilter(query.keyword);
    }
    return condition_keyword;
  }

  static _selectAfterQuery(query: any): ISelectAfterQuery {
    const select_fields: string = query?.select_fields || '';
    let select_by_populate = {};
    const select_by_project_aggregate: any[] = [];

    if (select_fields) {
      const select_array: string[] = select_fields.split(',');

      // Handle select for populate
      select_by_populate = select_array.join(' ');

      // Handle $project for aggregate
      const project_aggregate = {
        $project: {},
      };
      for (const select_field of select_array) {
        project_aggregate['$project'][`${select_field}`] = 1;
      }
      select_by_project_aggregate[0] = project_aggregate;
    }

    return {
      select_by_populate,
      select_by_project_aggregate,
    };
  }

  static _sortConverter(query: any = {}): any {
    const sort_name = query.sort_name;
    const sort_type = query.sort_type;
    const sort = {};
    if (sort_name && sort_type) {
      const name_arr = sort_name?.split(',')?.map((element) => element?.trim());
      const type_arr = sort_type?.split(',')?.map((element) => element?.trim());
      if (
        Array.isArray(name_arr) &&
        Array.isArray(type_arr) &&
        name_arr?.length > 0 &&
        type_arr?.length > 0
      ) {
        name_arr.forEach((element, idx) => {
          if (element) sort[element] = type_arr[idx] === 'des' ? -1 : 1; // des & asc
        });
      }
    }
    return sort;
  }

  static _conditionOption(
    query: any,
  ): IBaseFindConditonNoKeywordOptionResponse {
    const condition_option: IBaseFindConditonNoKeywordOptionResponse = {};

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'status',
      plural_field: 'statuses',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.STRING,
    });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'display_status',
      plural_field: 'display_statuses',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.STRING,
    });

    // Common.getConditionBySingularAndPluralField(query, condition_option, {
    //   singular_field: 'sponsorship_status',
    //   plural_field: 'sponsorship_statuses',
    //   convert_type: ENUM_BASE_FIND_CONVERT_TYPE.STRING,
    // });

    // Common.getConditionBySingularAndPluralField(query, condition_option, {
    //   singular_field: 'production_status',
    //   plural_field: 'production_statuses',
    //   convert_type: ENUM_BASE_FIND_CONVERT_TYPE.STRING,
    // });

    // Common.getConditionBySingularAndPluralField(query, condition_option, {
    //   singular_field: 'sponsor_category',
    //   plural_field: 'sponsor_categories',
    //   convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    // });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'sponsor_hashtag',
      plural_field: 'sponsor_hashtags',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'cast',
      plural_field: 'casts',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'platform',
      plural_field: 'platforms',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'sponsorship_form',
      plural_field: 'sponsorship_forms',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    });

    Common.getConditionBySingularAndPluralField(query, condition_option, {
      singular_field: 'exclude',
      plural_field: 'excludes',
      convert_type: ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
    });

    // if (query.year) {
    //   condition['start_date'] = { $gte: new Date(query.start_date) };
    //   condition['end_date'] = { $lte: new Date(query.end_date) };
    // }

    return condition_option;
  }

  static getConditionBySingularAndPluralField(
    object_origin: any, // query
    object_condition: any,
    payload: {
      singular_field: string; // field số ít
      plural_field?: string; // field số nhiều
      convert_type?: ENUM_BASE_FIND_CONVERT_TYPE; // convert field to mongo id
    },
  ): void {
    object_origin = object_origin
      ? Object.assign({}, object_origin)
      : object_origin;
    const singular_field: string = payload?.singular_field; // field số ít
    const plural_field: string = payload?.plural_field || `${singular_field}s`; // field số nhiều
    const convert_type = payload?.convert_type;

    // Query with singular field
    if (
      singular_field in object_origin &&
      !['', null, undefined].includes(
        object_origin[singular_field]?.toString()?.trim(),
      )
    ) {
      let convert_value_singular_field: any = object_origin[singular_field];
      switch (convert_type) {
        case ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID:
          convert_value_singular_field = Common.toObjectId(
            convert_value_singular_field,
          );
          break;
        case ENUM_BASE_FIND_CONVERT_TYPE.NUMBER:
          convert_value_singular_field = Common.toNumber(
            convert_value_singular_field,
          );
          break;
        default:
          break;
      }
      object_condition[singular_field] = convert_value_singular_field;
      object_condition[plural_field] = {
        $in: [convert_value_singular_field],
      };
    } else if (
      object_origin[plural_field] &&
      !_.isEmpty(object_origin[plural_field])
    ) {
      // Query with plural field
      if (
        !_.isArray(object_origin[plural_field]) &&
        _.isString(object_origin[plural_field])
      ) {
        const plural_field_temp = object_origin[plural_field]?.split(',');
        object_origin[plural_field] = plural_field_temp;
      }
      let convert_value_plural_field: any = object_origin[plural_field];
      switch (convert_type) {
        case ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID:
          convert_value_plural_field = Common.toObjectId(
            convert_value_plural_field,
          );
          break;
        case ENUM_BASE_FIND_CONVERT_TYPE.NUMBER:
          convert_value_plural_field = Common.toNumber(
            convert_value_plural_field,
          );
          break;
        default:
          break;
      }

      object_condition[singular_field] = { $in: convert_value_plural_field };
      object_condition[plural_field] = { $in: convert_value_plural_field };
    }
  }

  static createConditionFromDateToDate(from_date: Date, to_date: Date) {
    if (from_date && to_date) {
      return {
        $gte: new Date(
          moment(from_date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
            ENUM_DATE_TIME.START_OFFSET,
        ),
        $lte: new Date(
          moment(to_date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
            ENUM_DATE_TIME.END_OFFSET,
        ),
      };
    } else if (from_date && !to_date) {
      return {
        $gte: new Date(
          moment(from_date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
            ENUM_DATE_TIME.START_OFFSET,
        ),
      };
    } else if (!from_date && to_date) {
      return {
        $lte: new Date(
          moment(to_date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
            ENUM_DATE_TIME.END_OFFSET,
        ),
      };
    }
    return {};
  }

  /**
   * Create query range value for (aggregate query)
   * @param from_value
   * @param to_value
   */
  static createConditionFromValueToValue(from_value: any, to_value: any) {
    if (!isNaN(from_value) && !isNaN(to_value)) {
      return {
        $gte: Number(from_value),
        $lte: Number(to_value),
      };
    } else if (!isNaN(from_value)) {
      return {
        $gte: Number(from_value),
      };
    } else if (!isNaN(to_value)) {
      return {
        $lte: Number(to_value),
      };
    }
    return {};
  }

  /**
   * generate a random integer between min and max
   * @param {Number} min
   * @param {Number} max
   * @return {Number} random generated integer
   */
  static randomInt(min, max): any {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateCharacter(num = 5): string {
    let result = '';
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static generateCode(generate_code: string): string {
    if (generate_code) {
      return (
        generate_code.toUpperCase() +
        Math.floor(1000000 + Math.random() * 9000000)
      );
    }
  }

  static getLocalOffset(
    date = new Date(),
    format: string = undefined,
    offset: number = 420,
  ): string | any {
    // https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/09-utc-offset/
    if (format) {
      return moment(date).utcOffset(offset).format(format);
    }
    return moment(date).utcOffset(offset);
  }

  static sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  static isObject(object) {
    return object != null && typeof object === 'object';
  }

  static valueToBoolean(value: any) {
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
      return true;
    }
    if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
      return false;
    }
    return undefined;
  }

  static mergeObjectAfterLookupArray(
    new_array: string,
    origin_array: string,
    array_after_lookup: string,
    new_item_in_array: string,
  ): PipelineStage[] {
    return [
      {
        $addFields: {
          [`${new_array}`]: {
            $map: {
              input: `$${origin_array}`,
              as: 'origin_item',
              in: {
                $mergeObjects: [
                  '$$origin_item',
                  {
                    [`${new_item_in_array}`]: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: `$${array_after_lookup}`,
                            as: 'after_lookup_item',
                            cond: {
                              $eq: [
                                `$$origin_item.${new_item_in_array}`,
                                '$$after_lookup_item._id',
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];
  }

  static lookupOneField(
    from: string,
    refID: string,
    project: any,
    preserveNullAndEmptyArrays = true,
    field_alias = null,
  ): PipelineStage[] {
    const alias_field = field_alias ?? refID;
    return [
      {
        $lookup: {
          from: from,
          let: { refID: '$' + refID },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$refID'],
                },
              },
            },
            {
              $project: project,
            },
          ],
          as: alias_field,
        },
      },
      { $unwind: { path: '$' + alias_field, preserveNullAndEmptyArrays } },
    ];
  }

  static lookupArrayField(
    from: string,
    refID: string,
    project: any,
    field_search = '$_id',
    field_alias = null,
  ): PipelineStage[] {
    const alias_field = field_alias ?? refID;
    return [
      {
        $lookup: {
          from: from,
          let: { refIDs: '$' + refID },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [field_search, { $ifNull: ['$$refIDs', []] }],
                },
              },
            },
            {
              $project: project,
            },
          ],
          as: alias_field,
        },
      },
    ];
  }

  /**
   * Emit socket
   * @param configService
   * @param bearerToken
   * @param topic
   * @param room_id
   * @param message
   */
  static emitSocket = (params: SocketParamsInterface) => {
    const { topic, room_id, message, namespace } = params;

    const localUrl =
      process.env.SOCKET_URL + `${namespace ? `/${namespace}` : ''}`;
    const socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: process.env.ACCESS_TOKEN,
          },
        },
      },
    };
    const socket = io(localUrl, socketOptions);
    socket.on('connect', function () {
      socket.emit(topic, {
        room_id,
        cmd_type: SOCKET_EVENT_TYPE_ENUM.JOIN,
      });

      socket.emit(topic, {
        room_id,
        cmd_type: SOCKET_EVENT_TYPE_ENUM.MESSAGE,
        message,
      });

      socket.emit(topic, {
        room_id,
        cmd_type: SOCKET_EVENT_TYPE_ENUM.LEAVE,
      });
    });
  };

  static startTimeLog(name: string) {
    const start = new Date().getTime();
    return start;
  }

  static endTimeLog(name: string, start: any) {
    const end = new Date().getTime();
    const time = end - start;
    return end;
  }

  static chunkBlock<T = any>(
    data: Array<T>,
    numberPerBlock = 5,
  ): Array<Array<T>> {
    const blocks = [];
    while (data.length > 0) {
      const chunked = data.splice(0, numberPerBlock);
      blocks.push(chunked);
    }
    return blocks;
  }

  static async PromisePool(
    handler: Function,
    data: Array<unknown>,
    concurency = 50,
  ): Promise<void> {
    const iterator = data.entries();
    const workers = new Array(concurency)
      .fill(iterator)
      .map(async (iterator) => {
        for (const [index, item] of iterator) {
          await handler(item, index);
        }
      });
    await Promise.all(workers);
  }

  static JSONTryParse(input: any) {
    try {
      //check if the string exists
      if (this.isValidJsonString(input)) {
        return JSON.parse(input);
        //validate the result too
        // if (o && o.constructor === Object) {
        //     return o;
        // }
      }
    } catch (e: any) {}
    return false;
  }

  static isValidJsonString(jsonString) {
    if (!(jsonString && typeof jsonString === 'string')) {
      return false;
    }
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  static convertDocumentToObject(value: any) {
    return value && value instanceof mongoose.Document
      ? value.toObject()
      : value;
  }

  static async md5(input) {
    const hash = crypto.createHash('md5');
    return hash.update(input).digest('hex');
  }

  static createArrayRange(start, stop, step) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step,
    );
  }

  static dateFormat(date: any, fstr: any, utc: any) {
    Common.logger.log('dateFormat');

    utc = utc ? 'getUTC' : 'get';
    return fstr.replace(/%[YmdHMS]/g, function (m: any) {
      switch (m) {
        case '%Y':
          return date[utc + 'FullYear'](); // no leading zeros required
        case '%m':
          m = 1 + date[utc + 'Month']();
          break;
        case '%d':
          m = date[utc + 'Date']();
          break;
        case '%H':
          m = date[utc + 'Hours']();
          break;
        case '%M':
          m = date[utc + 'Minutes']();
          break;
        case '%S':
          m = date[utc + 'Seconds']();
          break;
        default:
          return m.slice(1); // unknown code, remove %
      }
      // add leading zero if required
      return ('0' + m).slice(-2);
    });
  }

  static toObjectId(ids: any): any[] | mongoose.Types.ObjectId {
    try {
      if (!ids) return ids;
      if (ids.constructor === Array) {
        for (let index = 0; index < ids.length; index++) {
          if (mongoose.Types.ObjectId.isValid(ids[index])) {
            ids[index] = new mongoose.Types.ObjectId(ids[index]);
          }
        }
        return ids;
      }
      if (mongoose.Types.ObjectId.isValid(ids)) {
        return new mongoose.Types.ObjectId(ids);
      }
      // logger.error('Id đã không hợp lệ.');
      return ids;
    } catch (error) {
      throw error;
    }
  }

  static toNumber(numbers: any): any | any[] {
    try {
      if (!numbers) return numbers;
      if (numbers.constructor === Array) {
        for (let index = 0; index < numbers.length; index++) {
          if (!isNaN(numbers[index])) {
            numbers[index] = Number(numbers[index]);
          }
        }
        return numbers;
      }
      if (!isNaN(numbers)) {
        return Number(numbers);
      }
      Common.logger.error('type number không hợp lệ.');
      return numbers;
    } catch (error) {
      throw error;
    }
  }

  static detectNullToObject(value: any): any {
    return _.isEmpty(value) ? {} : value;
  }

  static convertParamsToObjectId(payload: any): any {
    if (_.isEmpty(payload)) return payload;

    payload = Common.convertDocumentToObject(payload);

    const keys = Object.keys(Common.detectNullToObject(payload));
    if (keys && keys.length > 0) {
      for (const key of keys) {
        if (Array.isArray(payload[key]) && payload[key].length > 0) {
          payload[key] = _.map(payload[key], (ele) => {
            const item =
              typeof ele == 'string' && isMongoId(ele) == true
                ? new mongoose.Types.ObjectId(ele)
                : ele;
            return item;
          });
        }
        if (
          isMongoId(payload[key]) == true &&
          typeof payload[key] == 'string'
        ) {
          payload[key] = new mongoose.Types.ObjectId(payload[key]);
        }
        if (typeof payload[key] == 'object' && !_.isEmpty(payload[key])) {
          payload[key] = Common.convertParamsToObjectId(payload[key]);
        }
      }
    }
    return payload;
  }

  static translateObjectMapping(object_name) {
    const user = [
      'CreateUserDTO',
      'FindUserDTO',
      'UpdateProfileDTO',
      'UpdateUserDTO',
      'UpdateUserStatusDTO',
      'UpdateMoveUserDTO',
      'UpdateOffUserDTO',
      'ProfileDTO',
      'UpdateReplaceUserDTO',
      'UpdateUserGroupDTO',
    ];
    if (user.indexOf(object_name) !== -1) {
      return ENUM_MODEL.USER;
    }

    const setting = [
      'CreateSettingDTO',
      'FindSettingDTO',
      'UpdateSettingDTO',
      'UpdateSettingMultiplyDTO',
    ];
    if (setting.indexOf(object_name) !== -1) {
      return ENUM_MODEL.SETTING;
    }

    const masterData = [
      'FindMasterDataDTO',
      'CreateMasterDataDto',
      'UpdateMasterDataDto',
    ];
    if (masterData.indexOf(object_name) !== -1) {
      return ENUM_MODEL.MASTER_DATA;
    }
  }

  // function __sendTelegramFunction(
  //     telegramClient: ClientProxy,
  //     logger: Logger | LoggerService,
  //     telegram_request: {
  //         telegram_queue: QUEUES | ENUM_QUEUES;
  //         telegram_name: string;
  //         telegram_now?: any;
  //         telegram_request_id?: any;
  //     },
  //     telegram_text: string = '',
  //     telegram_cmd = SYNC_COMMAND.SEND_TELEGRAM_SYSTEM
  // ) {
  //     try {
  //         telegram_request.telegram_now =
  //             telegram_request.telegram_now ?? Date.now();
  //         telegram_request.telegram_request_id =
  //             telegram_request.telegram_request_id ??
  //             Math.floor(1000000 + Math.random() * 9000000);
  //         const icon =
  //             telegram_request.telegram_queue == QUEUES.CRONJOB ? '📅' : '🔔';
  //         const tele_text = `${icon}[${telegram_request.telegram_queue}][${telegram_request.telegram_name}][${telegram_request.telegram_request_id}] ${telegram_text}`;
  //         logger.log(tele_text);
  //         telegramClient.emit(
  //             { cmd: telegram_cmd },
  //             {
  //                 model_name: telegram_request.telegram_queue,
  //                 text: tele_text,
  //             }
  //         );
  //     } catch (error) {
  //         logger.error(error.message);
  //     }
  // }

  // static __sendTelegramStartFunction(
  //     telegramClient: ClientProxy,
  //     logger: Logger | LoggerService,
  //     telegram_request: {
  //         telegram_queue: QUEUES | ENUM_QUEUES;
  //         telegram_name: string;
  //         telegram_now?: any;
  //         telegram_request_id?: any;
  //     },
  //     telegram_text: string = '',
  //     telegram_cmd = SYNC_COMMAND.SEND_TELEGRAM_SYSTEM
  // ) {
  //     telegram_request.telegram_now = telegram_request.telegram_now ?? Date.now();
  //     telegram_request.telegram_request_id =
  //         telegram_request.telegram_request_id ??
  //         Math.floor(1000000 + Math.random() * 9000000);
  //     try {
  //         const icon =
  //             telegram_request.telegram_queue == QUEUES.CRONJOB ? '📅' : '🔔';
  //         const tele_text = `${icon}[${telegram_request.telegram_queue}][${telegram_request.telegram_name}][${telegram_request.telegram_request_id}]->Before...0ms ${telegram_text}`;
  //         logger.log(tele_text);
  //         telegramClient.emit(
  //             { cmd: telegram_cmd },
  //             {
  //                 model_name: telegram_request.telegram_queue,
  //                 text: tele_text,
  //             }
  //         );
  //     } catch (error) {
  //         logger.error(error.message);
  //     }
  //     return telegram_request;
  // }

  // static __sendTelegramEndFunction(
  //     telegramClient: ClientProxy,
  //     logger: Logger | LoggerService,
  //     telegram_request: {
  //         telegram_queue: QUEUES | ENUM_QUEUES;
  //         telegram_name: string;
  //         telegram_now?: any;
  //         telegram_request_id?: any;
  //     },
  //     telegram_text: string = '',
  //     telegram_cmd = SYNC_COMMAND.SEND_TELEGRAM_SYSTEM
  // ) {
  //     try {
  //         const icon =
  //             telegram_request.telegram_queue == QUEUES.CRONJOB ? '📅' : '🔔';
  //         const tele_text = `${icon}[${telegram_request.telegram_queue}][${telegram_request.telegram_name}][${telegram_request.telegram_request_id}]->After... ${Date.now() - telegram_request.telegram_now}ms ${telegram_text}`;
  //         logger.log(tele_text);
  //         telegramClient.emit(
  //             { cmd: telegram_cmd },
  //             {
  //                 model_name: telegram_request.telegram_queue,
  //                 text: tele_text,
  //             }
  //         );
  //     } catch (error) {
  //         logger.error(error.message);
  //     }
  // }

  // function __sendTelegramErrorFunction(
  //     telegramClient: ClientProxy,
  //     logger: Logger | LoggerService,
  //     telegram_request: {
  //         telegram_queue: QUEUES | ENUM_QUEUES;
  //         telegram_name: string;
  //         telegram_now?: any;
  //         telegram_request_id?: any;
  //     },
  //     telegram_text: string = '',
  //     telegram_cmd = SYNC_COMMAND.SEND_TELEGRAM_SYSTEM
  // ) {
  //     try {
  //         telegram_request.telegram_now =
  //             telegram_request.telegram_now ?? Date.now();
  //         telegram_request.telegram_request_id =
  //             telegram_request.telegram_request_id ??
  //             Math.floor(1000000 + Math.random() * 9000000);

  //         const tele_text = `📛[${telegram_request.telegram_queue}][${telegram_request.telegram_name}][${telegram_request.telegram_request_id}] ${telegram_text}`;
  //         logger.error(tele_text);
  //         telegramClient.emit(
  //             { cmd: telegram_cmd },
  //             {
  //                 model_name: telegram_request.telegram_queue,
  //                 text: tele_text,
  //             }
  //         );
  //     } catch (error) {
  //         logger.error(error.message);
  //     }
  // }

  static genRandomString(length): string {
    return crypto
      .randomBytes(Math.ceil(+length / 2))
      .toString('hex')
      .slice(0, length);
  }

  static compareValues(frist_value: any, second_value: any): boolean {
    return frist_value?.toString() === second_value?.toString() ? true : false;
  }

  static calculateTTLSeconds(endTime: Date): number {
    const current = moment();
    const expiredAt = moment(endTime);
    const diffInSeconds = expiredAt.diff(current, 'seconds');
    if (diffInSeconds <= 0) return 0;
    return diffInSeconds;
  }

  static veriryExtractToken(token) {
    var base64Payload = token.split('.')[1];
    if (!base64Payload) {
      return null;
    }
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }

  static calculateElapsedTimestamp(timestamp: string): string {
    const seconds = Math.floor((Date.now() - Number(timestamp)) / 1000);
    const interval = fromSinceIntervals.find((i) => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.vn_label} trước`;
  }

  static compareBetweenPastAndCurrent = (
    olds: Array<string> = [],
    news: Array<string> = [],
  ): IBaseBetweenPastAndCurrent => {
    // The old permissions existed but remove right now
    const differenceOldWithNew = _.difference(olds, news);
    // The new permissions existed but not exist in the old
    const diffrenceNewWithOld = _.difference(news, olds);
    // The permissions still exist between the old and the new
    const sameNewAndOld = _.intersection(news, olds);

    return {
      newArray: diffrenceNewWithOld,
      oldArray: differenceOldWithNew,
      sameArray: sameNewAndOld,
    };
  };

  static analysisVietNameseText(text: string): IVietnameseAnalysis {
    const words = text?.split('');
    const result: IVietnameseAnalysis = {
      $caseSensitive: false,
      $search: `'\"${text}\"'`,
      $diacriticSensitive: false,
    };
    for (const word of words) {
      const lowerVietNamese = LOWERCASE_VIETNAMESE_TEXTS.find((element) =>
        element.key.split('|').includes(word),
      );
      const upperVietNamese = UPPERCASE_VIETNAMESE_TEXTS.find((element) =>
        element.key.split('|').includes(word),
      );
      if (lowerVietNamese || upperVietNamese) {
        if (
          lowerVietNamese &&
          !Common.compareValues(lowerVietNamese.value, word)
        ) {
          result.$diacriticSensitive = true;
        }

        if (
          upperVietNamese &&
          !Common.compareValues(upperVietNamese.value, word)
        ) {
          result.$diacriticSensitive = true;
          result.$caseSensitive = true;
        }
      }
    }
    return result;
  }

  static transformDate(dateStr: string): Date {
    const [day, month, year] = dateStr?.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  static deepCleanObj(data: any) {
    // Handle remove properties empty, falsy or key of _info
    if (data instanceof Object) {
      for (const [key, value] of Object.entries(data)) {
        if (!value || _.isEmpty(value)) {
          delete data['key'];
        } else if (value instanceof Object) {
          this.deepCleanObj(data['key']);
        }
      }
    } else if (data instanceof Array) {
      for (const i in data) {
        this.deepCleanObj(data[i]);
      }
    }
  }

  static isChangeData(old_data, new_data): Boolean {
    const fields_compare_data_by_pass = [
      'updated_at',
      'updated_by_user',
      'updated_by',
      'history_resource',
      'last_sync_at',
    ];

    // Detect change data old vs new
    const update_data_clone = Common.convertDocumentToObject(_.clone(new_data));
    const old_data_clone = Common.convertDocumentToObject(_.clone(old_data));

    let is_allow_update: boolean = false;
    const object_change = {};

    this.deepCleanObj(update_data_clone);
    this.deepCleanObj(old_data_clone);

    for (const item_key in update_data_clone) {
      if (
        !fields_compare_data_by_pass.includes(item_key) &&
        !_.isEqual(old_data_clone[item_key], update_data_clone[item_key])
      ) {
        is_allow_update = true;
        // break;
        object_change[item_key] = old_data_clone[item_key];
      }
    }

    return is_allow_update;
  }
}
