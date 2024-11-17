import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeCategory,
  AttributeCategoryDocument,
  IAttributeCategory,
} from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateAttributeCategoryDTO,
  FindAttributeCategoryDTO,
  UpdateAttributeCategoryDTO,
  UpdateStatusAttributeCategoryDTO,
} from './dto/category';
import {
  CreateAttributeCategoryEntity,
  UpdateAttributeCategoryEntity,
  UpdateStatusAttributeCategoryEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeCategoryService extends BaseService<AttributeCategoryDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_CATEGORY;

  constructor(
    @InjectModel(AttributeCategory.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeCategoryDocument>,
    @InjectModel(AttributeCategory.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeCategoryDocument>,
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

  async findAll(query: FindAttributeCategoryDTO): Promise<IAttributeCategory> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const categories = await this._findAll(
      query,
      condition,
      condition_keyword,
      [],
      {},
      sort,
    );
    return categories;
  }

  async findById(_id: string): Promise<IAttributeCategory> {
    const category = await this._findById(_id);
    return category;
  }

  async create(body: CreateAttributeCategoryDTO): Promise<IAttributeCategory> {
    const category_existed = await this._findOne({ name: body.name });
    if (category_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Thể loại' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeCategoryEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeCategoryDTO,
  ): Promise<IAttributeCategory> {
    const category_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (category_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Thể loại' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeCategoryEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeCategoryDTO,
  ): Promise<IAttributeCategory> {
    const upload_payload = new UpdateStatusAttributeCategoryEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
