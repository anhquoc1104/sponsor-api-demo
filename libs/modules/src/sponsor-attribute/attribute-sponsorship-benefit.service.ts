import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import {
  AttributeSponsorshipBenefit,
  AttributeSponsorshipBenefitDocument,
  IAttributeSponsorshipBenefit,
} from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateAttributeSponsorshipBenefitDTO,
  FindAttributeSponsorshipBenefitDTO,
  UpdateAttributeSponsorshipBenefitDTO,
  UpdateStatusAttributeSponsorshipBenefitDTO,
} from './dto';
import {
  CreateAttributePlatformEntity,
  UpdateAttributeSponsorshipBenefitEntity,
  UpdateStatusAttributeSponsorshipBenefitEntity,
} from './entities';
import { ISelectAfterQuery } from '@app/common/interfaces';

@Injectable()
export class AttributeSponsorshipBenefitService extends BaseService<AttributeSponsorshipBenefitDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_BENEFIT;

  constructor(
    @InjectModel(AttributeSponsorshipBenefit.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeSponsorshipBenefitDocument>,
    @InjectModel(AttributeSponsorshipBenefit.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeSponsorshipBenefitDocument>,
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
    query: FindAttributeSponsorshipBenefitDTO,
  ): Promise<IAttributeSponsorshipBenefit> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const datas = await this._findAll(
      query,
      condition,
      condition_keyword,
      [],
      {},
      sort,
    );
    return datas;
  }

  async findById(_id: string): Promise<IAttributeSponsorshipBenefit> {
    const data = await this._findById(_id);
    return data;
  }

  async create(
    body: CreateAttributeSponsorshipBenefitDTO,
  ): Promise<IAttributeSponsorshipBenefit> {
    const data_existed = await this._findOne({ name: body.name });
    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Nhóm quyền lợi tài trợ' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const create_payload = new CreateAttributePlatformEntity(body);

    return await this._create(create_payload);
  }

  async update(
    id: string,
    body: UpdateAttributeSponsorshipBenefitDTO,
  ): Promise<IAttributeSponsorshipBenefit> {
    const data_existed = await this._findOne({
      name: body.name,
      _id: { $ne: Common.toObjectId(id) },
    });

    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Nhóm quyền lợi tài trợ' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const upload_payload = new UpdateAttributeSponsorshipBenefitEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusAttributeSponsorshipBenefitDTO,
  ): Promise<IAttributeSponsorshipBenefit> {
    const upload_payload = new UpdateStatusAttributeSponsorshipBenefitEntity(
      updateStatusDto,
    );

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
