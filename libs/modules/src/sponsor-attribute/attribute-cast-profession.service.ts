import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeCastProfession,
  AttributeCastProfessionDocument,
  IAttributeCastProfession,
} from '@app/schemas';
import {
  CreateAttributeCastProfessionDTO,
  FindAttributeCastProfessionDTO,
  UpdateAttributeCastProfessionDTO,
  UpdateStatusAttributeCastProfessionDTO,
} from './dto';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { throwErrorMessage } from '@app/shared';
import {
  CreateAttributeCastProfessionEntity,
  UpdateAttributeCastProfessionEntity,
  UpdateStatusAttributeCastProfessionEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeCastProfessionService extends BaseService<AttributeCastProfessionDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_CAST_PROFESSION;

  constructor(
    @InjectModel(AttributeCastProfession.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeCastProfessionDocument>,
    @InjectModel(AttributeCastProfession.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeCastProfessionDocument>,
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
    query: FindAttributeCastProfessionDTO,
  ): Promise<IAttributeCastProfession> {
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

  async findById(_id: string): Promise<IAttributeCastProfession> {
    const data = await this._findById(_id);
    return data;
  }

  async create(
    body: CreateAttributeCastProfessionDTO,
  ): Promise<IAttributeCastProfession> {
    const data_existed = await this._findOne({ name: body.name });
    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Thể loại người nổi tiếng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeCastProfessionEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeCastProfessionDTO,
  ): Promise<IAttributeCastProfession> {
    const data_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Thể loại người nổi tiếng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeCastProfessionEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeCastProfessionDTO,
  ): Promise<IAttributeCastProfession> {
    const upload_payload = new UpdateStatusAttributeCastProfessionEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
