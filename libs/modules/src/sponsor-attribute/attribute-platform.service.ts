import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributePlatform,
  AttributePlatformDocument,
  IAttributePlatform,
} from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateAttributePlatformDTO,
  FindAttributePlatformDTO,
  UpdateAttributePlatformDTO,
  UpdateStatusAttributePlatformDTO,
} from './dto';
import {
  CreateAttributePlatformEntity,
  UpdateAttributePlatformEntity,
  UpdateStatusAttributePlatformEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributePlatformService extends BaseService<AttributePlatformDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_PLATFORM;

  constructor(
    @InjectModel(AttributePlatform.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributePlatformDocument>,
    @InjectModel(AttributePlatform.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributePlatformDocument>,
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

  async findAll(query: FindAttributePlatformDTO): Promise<IAttributePlatform> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const platforms = await this._findAll(
      query,
      condition,
      condition_keyword,
      [],
      {},
      sort,
    );
    return platforms;
  }

  async findById(_id: string): Promise<IAttributePlatform> {
    const platform = await this._findById(_id);
    return platform;
  }

  async create(body: CreateAttributePlatformDTO): Promise<IAttributePlatform> {
    const platform_existed = await this._findOne({ name: body.name });
    if (platform_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Nền tảng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributePlatformEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributePlatformDTO,
  ): Promise<IAttributePlatform> {
    const platform_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (platform_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Nền tảng' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributePlatformEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributePlatformDTO,
  ): Promise<IAttributePlatform> {
    const upload_payload = new UpdateStatusAttributePlatformEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
