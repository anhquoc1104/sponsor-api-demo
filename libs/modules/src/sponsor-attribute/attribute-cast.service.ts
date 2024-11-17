import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeCast,
  AttributeCastDocument,
  AttributeCastProfession,
  IAttributeCast,
} from '@app/schemas';
import {
  CreateAttributeCastDTO,
  FindAttributeCastDTO,
  UpdateAttributeCastDTO,
  UpdateStatusAttributeCastDTO,
} from './dto';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { throwErrorMessage } from '@app/shared';
import {
  CreateAttributeCastEntity,
  UpdateAttributeCastEntity,
  UpdateStatusAttributeCastEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeCastService extends BaseService<AttributeCastDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_CAST;

  constructor(
    @InjectModel(AttributeCast.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeCastDocument>,
    @InjectModel(AttributeCast.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeCastDocument>,
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

  async findAll(query: FindAttributeCastDTO): Promise<IAttributeCast> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const datas = await this._findAll(
      query,
      condition,
      condition_keyword,
      [
        {
          path: 'cast_professions',
          model: AttributeCastProfession.name,
        },
      ],
      select_after_query.select_by_populate,
      sort,
    );
    return datas;
  }

  async findById(_id: string): Promise<IAttributeCast> {
    const data = await this._findById(_id, [
      {
        path: 'cast_professions',
        model: AttributeCastProfession.name,
      },
    ]);
    return data;
  }

  async create(body: CreateAttributeCastDTO): Promise<IAttributeCast> {
    const data_existed = await this._findOne({ name: body.name });
    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Người nổi tiếng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeCastEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeCastDTO,
  ): Promise<IAttributeCast> {
    const data_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Người nổi tiếng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeCastEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeCastDTO,
  ): Promise<IAttributeCast> {
    const upload_payload = new UpdateStatusAttributeCastEntity(updateStatusDto);

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
