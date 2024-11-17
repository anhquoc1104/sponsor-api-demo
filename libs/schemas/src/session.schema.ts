import { User } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class Session {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
    index: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  access_token: string;

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
    required: true,
  })
  access_token_expired_at: Date;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  refresh_token: string;

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
    required: true,
  })
  refresh_token_expired_at: Date;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  is_revoked: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  revoked_by?: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Date,
    default: Date.now,
    timezone: 'Asia/Ho_Chi_Minh',
    required: true,
  })
  revoked_at: Date;
}

export type SessionDocument = HydratedDocument<Session>;

export interface ISession extends SessionDocument {}

export const SessionSchema = SchemaFactory.createForClass(Session);
