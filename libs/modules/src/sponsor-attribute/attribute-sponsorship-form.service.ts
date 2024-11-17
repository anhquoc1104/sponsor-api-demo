import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import {
  BaseService,
  Common,
  CONNECTION_NAME,
  ENUM_MODEL,
  ENUM_STATUS,
} from '@app/common';
import {
  AttributeSponsorshipBenefit,
  AttributeSponsorshipForm,
  AttributeSponsorshipFormDocument,
  IAttributeSponsorshipForm,
} from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateAttributeSponsorshipFormDTO,
  FindAttributeSponsorshipFormDTO,
  UpdateAttributeSponsorshipFormDTO,
  UpdateStatusAttributeSponsorshipFormDTO,
} from './dto';
import {
  CreateAttributeSponsorshipFormEntity,
  UpdateAttributeSponsorshipFormEntity,
  UpdateStatusAttributeSponsorshipFormEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeSponsorshipFormService extends BaseService<AttributeSponsorshipFormDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_FORM;

  constructor(
    @InjectModel(AttributeSponsorshipForm.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeSponsorshipFormDocument>,
    @InjectModel(AttributeSponsorshipForm.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeSponsorshipFormDocument>,
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
    query: FindAttributeSponsorshipFormDTO,
  ): Promise<IAttributeSponsorshipForm> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const datas = await this._findAll(
      query,
      condition,
      condition_keyword,
      [
        {
          path: 'sponsor_benefit',
          match: { status: ENUM_STATUS.ACTIVE },
          select: 'code name image description',
          model: AttributeSponsorshipBenefit.name,
        },
      ],
      {},
      sort,
    );
    return datas;
  }

  async findById(_id: string): Promise<IAttributeSponsorshipForm> {
    const data = await this._findById(_id, [
      {
        path: 'sponsor_benefit',
        match: { status: ENUM_STATUS.ACTIVE },
        select: 'code name image description',
        model: AttributeSponsorshipBenefit.name,
      },
    ]);
    return data;
  }

  async create(
    body: CreateAttributeSponsorshipFormDTO,
  ): Promise<IAttributeSponsorshipForm> {
    const data_existed = await this._findOne({ name: body.name });
    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Hình thức tài trợ' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributeSponsorshipFormEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeSponsorshipFormDTO,
  ): Promise<IAttributeSponsorshipForm> {
    const data_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Hình thức tài trợ' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeSponsorshipFormEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeSponsorshipFormDTO,
  ): Promise<IAttributeSponsorshipForm> {
    const upload_payload = new UpdateStatusAttributeSponsorshipFormEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
