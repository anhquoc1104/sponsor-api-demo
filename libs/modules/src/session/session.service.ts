import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { BaseService, Common, CONNECTION_NAME, ENUM_MODEL } from '@app/common';
import { Session, SessionDocument } from '@app/schemas/session.schema';

@Injectable()
export class SessionService extends BaseService<SessionDocument> {
  model_name = ENUM_MODEL.SESSION;
  constructor(
    @InjectModel(Session.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<SessionDocument>,
    @InjectModel(Session.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<SessionDocument>,
  ) {
    super(model, readModel);
  }
}
