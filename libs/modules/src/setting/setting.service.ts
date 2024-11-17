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
  ISetting,
  Setting,
  SettingDocument,
} from '@app/schemas/setting.schema';
import {
  CreateSettingDTO,
  UpdateSettingDTO,
  UpdateStatusSettingDTO,
} from './dto';
import {
  CreateSettingEntity,
  UpdateSettingEntity,
  UpdateStatusSettingEntity,
} from './entities';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';

@Injectable()
export class SettingService extends BaseService<SettingDocument> {
  model_name = ENUM_MODEL.SETTING;

  constructor(
    @InjectModel(Setting.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<SettingDocument>,
    @InjectModel(Setting.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<SettingDocument>,
  ) {
    super(model, readModel);
  }

  async findAll(query: any): Promise<ISetting[]> {
    const condition = {
      status: ENUM_STATUS.ACTIVE,
    };
    const select = {};
    const datas = await this._findAll(query, condition, {}, [], select, null);

    return datas;
  }

  async findById(id: string): Promise<ISetting> {
    const data = await this._findById(id);

    return data;
  }

  async findByKey(key: string): Promise<ISetting> {
    const condition = {
      key: key?.toUpperCase(),
      status: ENUM_STATUS.ACTIVE,
    };
    const data = await this._findOne(condition);

    return data?.value;
  }

  async create(body: CreateSettingDTO): Promise<ISetting> {
    const data_existed = await this.findByKey(body.key);
    if (data_existed) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Setting' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const create_payload = new CreateSettingEntity(body);

    return await this._create(create_payload);
  }

  async update(id: string, body: UpdateSettingDTO): Promise<ISetting> {
    const upload_payload = new UpdateSettingEntity(body);

    return await this._findByIdAndUpdate(id, upload_payload);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusSettingDTO,
  ): Promise<ISetting> {
    const upload_payload = new UpdateStatusSettingEntity(updateStatusDto);

    return await this._findByIdAndUpdate(id, upload_payload);
  }
}
