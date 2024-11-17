import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeHashtag,
  AttributeHashtagDocument,
  IAttributeHashtag,
} from '@app/schemas';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { throwErrorMessage } from '@app/shared';
import {
  CreateAttributeTagEntity,
  UpdateAttributeTagEntity,
  UpdateStatusAttributeTagEntity,
} from './entities/hashtag';
import {
  CreateAttributeTagDTO,
  FindAttributeTagDTO,
  UpdateAttributeTagDTO,
  UpdateStatusAttributeTagDTO,
} from './dto/hashtag';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeHashtagService extends BaseService<AttributeHashtagDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_HASHTAG;

  constructor(
    @InjectModel(AttributeHashtag.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeHashtagDocument>,
    @InjectModel(AttributeHashtag.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeHashtagDocument>,
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

  async findAll(query: FindAttributeTagDTO): Promise<IAttributeHashtag> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const hashatgs = await this._findAll(
      query,
      condition,
      condition_keyword,
      [],
      {},
      sort,
    );
    return hashatgs;
  }

  async findById(_id: string): Promise<IAttributeHashtag> {
    const hashatg = await this._findById(_id);
    return hashatg;
  }

  async create(body: CreateAttributeTagDTO): Promise<IAttributeHashtag> {
    const hashatg_existed = await this._findOne({ name: body.name });
    if (hashatg_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Tag' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeTagEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeTagDTO,
  ): Promise<IAttributeHashtag> {
    const hashatg_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (hashatg_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Tag' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeTagEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeTagDTO,
  ): Promise<IAttributeHashtag> {
    const upload_payload = new UpdateStatusAttributeTagEntity(updateStatusDto);

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
