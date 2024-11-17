import { ACCOUNT_TYPE } from '@app/common/enums';
import { TOKEN_TYPE } from '@app/common/enums/jwt.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class Blacklist {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  token: string;

  @Prop({
    type: Date,
    default: Date.now,
    timezone: 'Asia/Ho_Chi_Minh',
    required: true,
  })
  expire_at: Date;

  @Prop({
    type: String,
    enum: TOKEN_TYPE,
    index: true,
  })
  type: TOKEN_TYPE;
}

export type BlacklistDocument = HydratedDocument<Blacklist>;

export interface IBlacklist extends Partial<Blacklist> {
  _id?: any;
}

export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
