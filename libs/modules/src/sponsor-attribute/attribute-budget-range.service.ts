import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeBudgetRange,
  AttributeBudgetRangeDocument,
  IAttributeBudgetRange,
} from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateAttributeBudgetRangeDTO,
  FindAttributeBudgetRangeDTO,
  UpdateAttributeBudgetRangeDTO,
  UpdateStatusAttributeBudgetRangeDTO,
} from './dto';
import {
  CreateAttributeBudgetRangeEntity,
  UpdateAttributeBudgetRangeEntity,
  UpdateStatusAttributeBudgetRangeEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeBudgetRangeService extends BaseService<AttributeBudgetRangeDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_BUDGET_RANGE;

  constructor(
    @InjectModel(AttributeBudgetRange.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeBudgetRangeDocument>,
    @InjectModel(AttributeBudgetRange.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeBudgetRangeDocument>,
  ) {
    super(model, readModel);
  }

  conditionFindAll(query): {
    condition: any;
    condition_keyword: any;
    sort: any;
    select_after_query: ISelectAfterQuery;
  } {
    const { condition, condition_keyword, sort, select_after_query } =
      Common._conditionFindAll({
        query,
        condition_fields: ['status'],
      });

    return {
      condition: condition,
      condition_keyword: condition_keyword,
      sort: sort,
      select_after_query: select_after_query,
    };
  }

  async findAll(
    query: FindAttributeBudgetRangeDTO,
  ): Promise<IAttributeBudgetRange> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const datas = await this._findAll(
      query,
      condition,
      condition_keyword,
      [],
      select_after_query.select_by_populate,
      sort,
    );
    return datas;
  }

  async findById(_id: string): Promise<IAttributeBudgetRange> {
    const cast = await this._findById(_id);
    return cast;
  }

  async create(
    body: CreateAttributeBudgetRangeDTO,
  ): Promise<IAttributeBudgetRange> {
    const cast_existed = await this._findOne({ name: body.name });
    if (cast_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Budget Range' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeBudgetRangeEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeBudgetRangeDTO,
  ): Promise<IAttributeBudgetRange> {
    const cast_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (cast_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Budget Range' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeBudgetRangeEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeBudgetRangeDTO,
  ): Promise<IAttributeBudgetRange> {
    const upload_payload = new UpdateStatusAttributeBudgetRangeEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
