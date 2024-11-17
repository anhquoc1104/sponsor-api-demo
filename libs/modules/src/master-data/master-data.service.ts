import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { BaseService, CONNECTION_NAME, ENUM_MODEL } from '@app/common';

@Injectable()
export class MasterDataService extends BaseService<any> {
  model_name = ENUM_MODEL.MASTER_DATA;

  constructor(
    @InjectModel('MasterData', CONNECTION_NAME.PRIMARY)
    public readonly model: Model<any>,
    @InjectModel('MasterData', CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<any>,
  ) {
    super(model, readModel);
  }
}
