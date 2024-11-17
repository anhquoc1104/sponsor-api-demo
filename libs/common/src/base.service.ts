import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IORedisOptions } from '@nestjs/microservices/external/redis.interface';
import { Queue } from 'bull';
import { Cache, Store } from 'cache-manager';
import * as _ from 'lodash';
import mongoose, { Document, Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import {
  CONNECTION_NAME,
  ENUM_MODEL,
  ENUM_RESOURCE_SYSTEM,
  REDIS_NAME_ENUM,
} from './enums';
import { Common } from './functions';
import { IBaseService } from './interfaces/i.base.service';
import { IBaseMeta } from '@app/common/interfaces';
import { InjectConnection } from '@nestjs/mongoose';
import { throwErrorMessage } from '@app/shared';

// interface RedisCache extends Cache {
//   store: RedisStore;
// }
// interface RedisStore extends Store {
//   name: typeof REDIS_NAME_ENUM.SPONSOR_REDIS;
//   getClient: () => IORedisOptions;
//   isCacheableValue: (value: any) => boolean;
// }
@Injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
  protected readonly model_obj;
  protected readonly read_model_obj;
  protected readonly logger: LoggerService;
  protected processQueueT: Queue = undefined;
  protected model_name: ENUM_MODEL;
  protected resource_system_name: ENUM_RESOURCE_SYSTEM =
    global.resource_system_name;

  @Inject()
  i18n: I18nService;

  @Inject()
  configService: ConfigService;

  @Inject()
  protected readonly eventEmitterT: EventEmitter2;

  @InjectConnection(CONNECTION_NAME.PRIMARY)
  protected readonly connection: mongoose.Connection;

  constructor(
    private readonly modelT: Model<T> = undefined,
    private readonly readModelT: Model<T> = undefined,
  ) {
    this.model_obj = modelT;
    this.read_model_obj = readModelT;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * _findALlIds
   * @param condition
   * @private
   */
  async _countDocuments(condition: any): Promise<any> {
    this.logger.log('_countDocuments->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = await this.read_model_obj
      .countDocuments(condition)
      .allowDiskUse(true)
      .exec();
    this.logger.log(`_countDocuments->After... ${Date.now() - now}ms`);
    return result;
  }

  /**
   * _findAll
   * @param query
   * @param condition
   * @param conditionKeyword
   * @param populates
   * @param select
   * @param sort
   * @private
   */
  async _findAll(
    query: any,
    condition: any = undefined,
    conditionKeyword: any = undefined,
    populates = [],
    select: any = {},
    sort: any = { updated_at: -1 },
  ): Promise<any> {
    this.logger.log('_findAll->Before...0ms');
    const now = Date.now();
    if (condition) {
      condition = Common.convertParamsToObjectId(condition);
    }
    if (conditionKeyword) {
      condition = { ...condition, ...conditionKeyword };
    }
    let data;
    let meta: IBaseMeta;
    if (Common.valueToBoolean(query.is_paging) == false) {
      await this.read_model_obj
        .find(condition)
        .populate(populates)
        .sort(sort)
        .select(select)
        .then((response) => {
          data = Common.JSONTryParse(JSON.stringify(response));
        });
      meta = {
        tota_iItems: data ? data.length : 0,
      };
    } else {
      const per_page = query.per_page ? query.per_page : 20;
      const current_page = query.page && query.page > 0 ? query.page : 1;
      const skip = current_page == 1 ? 0 : per_page * (current_page - 1);
      await this.read_model_obj
        .find(condition)
        .populate(populates)
        .skip(Number(skip))
        .limit(Number(per_page))
        .sort(sort)
        .select(select)
        .then((response) => {
          data = Common.JSONTryParse(JSON.stringify(response));
        });
      const total = await this.read_model_obj.find(condition).countDocuments();
      meta = {
        per_page: Number(per_page),
        current_page: Number(current_page),
        tota_iItems: Number(total),
        total_pages:
          Number(total) % Number(per_page) == 0
            ? Number(total) / Number(per_page)
            : Math.ceil(Number(total) / Number(per_page)),
      };
    }
    this.logger.log(`_findAll->After... ${Date.now() - now}ms`);
    return {
      data: data ? data : [],
      meta: meta,
      query,
    };
  }

  /**
   * _findALlIds
   * @param condition
   * @private
   */
  async _findALlIds(condition: any = undefined): Promise<any> {
    this.logger.log('_findALlIds->Before...0ms');
    const now = Date.now();
    if (condition) {
      condition = Common.convertParamsToObjectId(condition);
    }
    const aggregate = [
      {
        $match: condition,
      },
      {
        $group: {
          _id: {},
          list_ids: {
            $push: '$_id',
          },
        },
      },
      {
        $project: {
          list_ids: 1,
        },
      },
    ];
    const result = await this.read_model_obj
      .aggregate(aggregate)
      .allowDiskUse(true)
      .exec();
    this.logger.log(`_findALlIds->After... ${Date.now() - now}ms`);
    if (result && result.length > 0) {
      return result[0].list_ids;
    }
    return [];
  }

  async _findALlIdsByField(
    condition: any = undefined,
    field_name: string,
  ): Promise<any> {
    this.logger.log('_findALlIdsByField->Before...0ms');
    const now = Date.now();
    if (condition) {
      condition = Common.convertParamsToObjectId(condition);
    }
    const aggregate = [
      {
        $match: condition,
      },
      {
        $group: {
          _id: {},
          list_ids: {
            $push: `$${field_name}`,
          },
        },
      },
      {
        $project: {
          list_ids: 1,
        },
      },
    ];
    const result = await this.read_model_obj
      .aggregate(aggregate)
      .allowDiskUse(true)
      .exec();
    this.logger.log(`_findALlIdsByField->After... ${Date.now() - now}ms`);
    if (result && result.length > 0) {
      return result[0].list_ids;
    }
    return [];
  }

  /**
   * _find
   * @param condition
   * @param populates
   * @param sort
   * @param select
   * @private
   */
  async _find(
    condition: any,
    populates = [],
    select: any = {},
    sort: any = { updated_at: -1 },
  ): Promise<any> {
    this.logger.log('_find->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = this.read_model_obj
      .find(condition)
      .populate(populates)
      .sort(sort)
      .select(select)
      .exec();
    this.logger.log(`_find->After... ${Date.now() - now}ms`);
    return result;
  }

  /**
   * _findOne
   * @param condition
   * @param populates
   * @param select
   * @private
   */
  async _findOne(condition: any, populates = [], select = {}): Promise<any> {
    this.logger.log('_findOne->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = this.model_obj.findOne(condition);
    if (populates) {
      populates.forEach((el) => {
        if (el.path && !el.model) {
          result.populate(el.path);
        } else {
          result.populate(el);
        }
      });
    }
    this.logger.log(`_findOne->After... ${Date.now() - now}ms`);
    return await result.select(select).lean();
  }

  /**
   * _findIndex
   * @param condition
   * @private
   */
  async _findIndex(condition: any): Promise<any> {
    this.logger.log('_findIndex->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = this.model_obj.findIndex(condition).exec();
    this.logger.log(`_findIndex->After... ${Date.now() - now}ms`);
    return result;
  }

  /**
   * _aggregate
   * @param aggregate
   * @private
   */
  async _aggregate(aggregate: any): Promise<any> {
    this.logger.log('_aggregate->Before...0ms');
    const now = Date.now();
    const result = await this.read_model_obj
      .aggregate(aggregate)
      .allowDiskUse(true)
      .exec();
    this.logger.log(`_aggregate->After... ${Date.now() - now}ms`);
    return result;
  }

  /**
   * _findById
   * @param id
   * @param populates
   * @param option
   * @private
   */
  async _findById(id: any, populates = [], option = {}): Promise<T> {
    this.logger.log('_findById->Before...0ms');
    const now = Date.now();
    const result = this.model_obj.findById(Common.toObjectId(id));
    if (populates) {
      populates.forEach((el) => {
        result.populate(el);
      });
    }
    this.logger.log(`_findById->After... ${Date.now() - now}ms`);
    return await result.select(option).lean();
  }

  /**
   * _create
   * @param data
   * @param options
   * @private
   */
  async _create(data: any, options: any = {}): Promise<T | any> {
    this.logger.log('_create->Before...0ms');
    const now = Date.now();
    try {
      data.updated_at = Common.getLocalOffset(new Date());
      const obj = new this.model_obj(data);
      const result = await obj.save(options);
      this.logger.log(`_create->After... ${Date.now() - now}ms`);
      return result;
    } catch (error) {
      this.logger.error(error?.message);
      throwErrorMessage(error);
    } finally {
      this.logger.log(`_create->After... ${Date.now() - now}ms`);
    }
    // return undefined;
  }

  /**
   * _updateOne
   * @param condition
   * @param data
   * @param options
   * @private
   */
  async _updateOne(
    condition: any,
    data: any,
    options: any = { new: true },
  ): Promise<Boolean> {
    this.logger.log('_updateOne->Before...0ms');
    const now = Date.now();
    try {
      data.updated_at = Common.getLocalOffset(new Date());
      condition = Common.convertParamsToObjectId(condition);
      const result = await this.model_obj
        .updateOne(condition, data, options)
        .exec();
      this.logger.debug('_updateOne->result', result);
      if (result) {
        this.logger.log(`_updateOne->After... ${Date.now() - now}ms`);
        return true;
      }
    } catch (error) {
      this.logger.error(error?.message);
      throwErrorMessage(error);
    } finally {
      this.logger.log(`_updateOne->After->Final... ${Date.now() - now}ms`);
    }
    return false;
  }

  /**
   * _findOneAndUpdate
   * @param condition
   * @param data
   * @param options
   * @private
   */
  async _findOneAndUpdate(
    condition: any,
    data: any,
    options: any = { new: true },
  ): Promise<T> {
    this.logger.log('_findOneAndUpdate->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);

    if (options) {
      options.new = true;
    }
    data.updated_at = Common.getLocalOffset(new Date());
    const new_data = await this.model_obj
      .findOneAndUpdate(condition, data, options)
      .exec();

    this.logger.log(`_findOneAndUpdate->After... ${Date.now() - now}ms`);
    return new_data;
  }

  /**
   * _updateStatus
   * @param id
   * @param data
   * @param options
   * @private
   */
  async _updateStatus(
    id: any,
    data,
    options: any = { new: true },
  ): Promise<any> {
    this.logger.log('_updateStatus->Before...0ms');
    data.updated_at = Common.getLocalOffset(new Date());
    const now = Date.now();
    id = Common.toObjectId(id);
    const old_data = await this.model_obj.findById(id).exec();
    if (!old_data) {
      throw new NotFoundException(
        await this.i18n.translate('validations.not_exists', {
          args: { attribute: 'Id' },
        }),
      );
    }
    if (old_data.status == data.status) {
      return old_data;
    }
    if (options) {
      options.new = true;
    }
    const new_data = await this.model_obj
      .findByIdAndUpdate(id, data, options)
      .exec();
    this.logger.log(`_updateStatus->After... ${Date.now() - now}ms`);
    return new_data;
  }

  /**
   * _findByIdAndUpdate
   * @param id
   * @param data
   * @param options
   * @param populates
   * @private
   */
  async _findByIdAndUpdate(
    id: any,
    data: any,
    options: any = { new: true },
    populates = [],
  ): Promise<any> {
    this.logger.log('_findByIdAndUpdate->Before...0ms');
    data.updated_at = Common.getLocalOffset(new Date());
    const now = Date.now();
    id = Common.toObjectId(id);
    const old_data = await this.model_obj.findById(id).exec();
    if (!old_data) {
      throw new NotFoundException(
        await this.i18n.translate('validations.not_exists', {
          args: { attribute: 'Id' },
        }),
      );
    }

    if (options) {
      options.new = true;
    }

    const new_data = await this.model_obj
      .findByIdAndUpdate(id, data, options)
      .populate(populates)
      .exec();

    this.logger.log(`_findByIdAndUpdate->After... ${Date.now() - now}ms`);
    return new_data;
  }

  async _getAll(
    query: any,
    condition: any = {},
    conditionKeyword: any = {},
    lookup: any = [],
    sort: any = { created_at: -1 },
    conditionKeywordAfter: any = {},
    lookupAfter: any = [],
  ): Promise<any> {
    this.logger.log('_getAll->Before...0ms');
    const now = Date.now();
    const aggregate = [
      { $match: condition },
      ...lookup,
      { $match: conditionKeyword },
    ];
    const aggregateAfter = [{ $match: conditionKeywordAfter }];
    if (Common.valueToBoolean(query.is_paging) == false) {
      let data;
      if (!_.isEmpty(sort)) {
        data = await this.read_model_obj.aggregate([
          ...aggregate,
          ...aggregateAfter,
          { $sort: sort },
          ...lookupAfter,
        ]);
      } else {
        data = await this.read_model_obj.aggregate([
          ...aggregate,
          ...aggregateAfter,
          ...lookupAfter,
        ]);
      }
      this.logger.log(`After... ${Date.now() - now}ms`);
      return {
        data: data,
        meta: {
          tota_items: data.length,
        },
      };
    } else {
      const per_page = query.per_page ? Number(query.per_page) : 20;
      const current_page =
        query.page && query.page > 0 ? Number(query.page) : 1;

      let data, countRecords, explain;
      if (!_.isEmpty(sort)) {
        [
          data,
          countRecords,
          // explain
        ] = await Promise.all([
          this.read_model_obj
            .aggregate([
              ...aggregate,
              ...aggregateAfter,
              { $sort: sort },
              { $skip: (current_page - 1) * per_page },
              { $limit: per_page },
              ...lookupAfter,
            ])
            .allowDiskUse(true)
            .exec(),
          this.read_model_obj
            .aggregate([
              ...aggregate,
              ...aggregateAfter,
              { $group: { _id: null, count: { $sum: 1 } } },
            ])
            .allowDiskUse(true)
            .exec(),
          // this.configService.get(ENVIROMENT_VARIABLE.ENVIRONMENT) !== 'prod'
          //   ? this.read_model_obj
          //       .aggregate([...aggregate, ...aggregateAfter], {
          //         explain: true,
          //       })
          //       .allowDiskUse(true)
          //   : [{}],
        ]);
      } else {
        [
          data,
          countRecords,
          // explain
        ] = await Promise.all([
          this.read_model_obj
            .aggregate([
              ...aggregate,
              ...aggregateAfter,
              { $skip: (current_page - 1) * per_page },
              { $limit: per_page },
              ...lookupAfter,
            ])
            .allowDiskUse(true)
            .exec(),
          this.read_model_obj
            .aggregate([
              ...aggregate,
              ...aggregateAfter,
              { $group: { _id: null, count: { $sum: 1 } } },
            ])
            .allowDiskUse(true)
            .exec(),
          // this.configService.get(ENVIROMENT_VARIABLE.ENVIRONMENT) !== 'prod'
          //   ? this.read_model_obj
          //       .aggregate([...aggregate, ...aggregateAfter], {
          //         explain: true,
          //       })
          //       .allowDiskUse(true)
          //   : [{}],
        ]);
      }
      const total = countRecords.length > 0 ? countRecords[0].count : 0;
      this.logger.log(`_getAll->After... ${Date.now() - now}ms`);
      // let winningPlan = undefined;
      // // check have search index database
      // try {
      //   if (this.configService.get(ENVIROMENT_VARIABLE.ENVIRONMENT) !== 'prod') {
      //     winningPlan = explain[0]?.queryPlanner?.winningPlan;
      //     if (!winningPlan) {
      //       winningPlan =
      //         explain[0]?.stages[0].$cursor?.queryPlanner?.winningPlan;
      //     }
      //   }
      // } catch (err) {
      //   this.logger.error(`_getAll->winningPlan`, err);
      // }
      return {
        data: data,
        meta: {
          per_page: Number(per_page),
          current_page: Number(current_page),
          tota_iItems: total,
          total_pages:
            Number(total) % Number(per_page) == 0
              ? Number(total) / Number(per_page)
              : Math.ceil(Number(total) / Number(per_page)),
          // explain: winningPlan,
        },
        query,
      };
    }
  }

  /**
   * _delete
   * @param id
   * @private
   */
  async _delete(id: string): Promise<T> {
    this.logger.log('_delete->Before...0ms');
    const now = Date.now();
    id = Common.toObjectId(id) as any;
    const old_data = await this.read_model_obj.findById(id).exec();
    if (!old_data) {
      throw new NotFoundException(
        await this.i18n.translate('validations.not_exists', {
          args: { attribute: 'Id' },
        }),
      );
    }

    const result = this.model_obj.findByIdAndRemove(id).exec();
    this.logger.log(`_delete->After... ${Date.now() - now}ms`);
    return result;
  }

  async _deleteMany(condition: any): Promise<any> {
    this.logger.log('_deleteMany->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = await this.model_obj.deleteMany(condition).exec();
    this.logger.log(`_deleteMany->After... ${Date.now() - now}ms`);
    return result;
  }

  async _insertMany(condition: any): Promise<any> {
    this.logger.log('_insertMany->Before...0ms');
    const now = Date.now();
    condition = Common.convertParamsToObjectId(condition);
    const result = await this.model_obj.insertMany(condition);
    this.logger.log(`_insertMany->After... ${Date.now() - now}ms`);
    return result;
  }

  async _updateMany(condition: any, payload: any): Promise<any> {
    this.logger.log('_insertMany->Before...0ms');
    const now = Date.now();
    payload.updated_at = Common.getLocalOffset(new Date());
    condition = Common.convertParamsToObjectId(condition);
    const result = await this.model_obj.updateMany(condition, payload).exec();
    this.logger.log(`_insertMany->After... ${Date.now() - now}ms`);
    return result;
  }

  _createIndexes(): void {
    this.model_obj.createIndexes();
  }
}
