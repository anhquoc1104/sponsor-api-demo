import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import mongoose, { AggregateOptions, Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import {
  ACCOUNT_TYPE,
  BaseService,
  COLLECTION,
  Common,
  CONNECTION_NAME,
  ENUM_MODEL,
  POPULATE,
} from '@app/common';
import { Group, GroupDocument, IGroup } from '@app/schemas';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  CreateGroupDTO,
  FindGroupDTO,
  UpdateGroupDTO,
  UpdateGroupStatusDTO,
} from 'apps/admin-service/src/modules/group/group.dto';
import { IBaseGetAllResult } from '@app/common/interfaces';
import { AGGREGATE } from '@app/common/constants/schema.constant';

@Injectable()
export class GroupService extends BaseService<GroupDocument> {
  model_name = ENUM_MODEL.GROUP;
  constructor(
    @InjectModel(Group.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<GroupDocument>,
    @InjectModel(Group.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<GroupDocument>,
  ) {
    super(model, readModel);
  }

  async getInformation(
    id: string | mongoose.Schema.Types.ObjectId,
    isSensitive: boolean = false,
  ): Promise<IGroup> {
    const populates = isSensitive
      ? []
      : [
          { path: 'updated_by', select: POPULATE.USER },
          { path: 'created_by', select: POPULATE.USER },
        ];
    const group = await this._findById(id, populates);
    if (!group) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.NOT_EXIST,
          i18nArgs: { attribute: 'Nhóm' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return group;
  }

  async update(id: string, payload: UpdateGroupDTO): Promise<IGroup> {
    await this.getInformation(id);
    return await this._findByIdAndUpdate(
      id,
      {
        name: payload.name,
        description: payload.description,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
  }

  async create(payload: CreateGroupDTO): Promise<IGroup> {
    const newUser: IGroup = {
      name: payload.name,
      description: payload?.description || null,
      type: payload.type as ACCOUNT_TYPE,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    };
    return await this._create(newUser);
  }

  async findAll(query: FindGroupDTO): Promise<IBaseGetAllResult> {
    const condition = this._getQueryCondition(query);
    let response = await this._getAll(
      query,
      condition,
      {},
      [
        ...Common.lookupOneField(
          COLLECTION.USER,
          'created_by',
          AGGREGATE.USER,
          true,
        ),
        ...Common.lookupOneField(
          COLLECTION.USER,
          'updated_by',
          AGGREGATE.USER,
          true,
        ),
        {
          $project: {
            current_salt: 0,
            current_password: 0,
            used_passwords: 0,
          },
        },
      ],
      {
        updated_at: -1,
      },
      {},
      [
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'group',
            as: 'users',
          },
        },
        {
          $addFields: {
            user_amount: { $size: '$users' },
          },
        },
        {
          $project: {
            users: 0,
          },
        },
      ],
    );
    return response;
  }

  async updateStatus(
    id: string,
    payload: UpdateGroupStatusDTO,
  ): Promise<IGroup> {
    await this.getInformation(id, true);
    return await this._findByIdAndUpdate(id, {
      updated_at: payload.updated_at,
      updated_by: payload.updated_by,
      status: payload.status,
    });
  }

  //#region PRIVATE
  _getQueryCondition(query: FindGroupDTO): AggregateOptions {
    let $match: AggregateOptions = {};
    if (query?.keyword) {
      $match.$text = Common.analysisVietNameseText(query?.keyword);
    }
    if (query.type) {
      $match.type = query.type;
    }
    if (query?.status) {
      $match.status = query.status;
    }
    return $match;
  }

  //#endregion
}
