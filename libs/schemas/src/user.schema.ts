import { ACCOUNT_TYPE } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base';
import { Group } from './group.schema';
import { Common } from '@app/common';
import { IPermissionFrame } from '@app/common/interfaces';
@Schema({ _id: false, versionKey: false })
class UsedPassword {
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  salt: string;

  @Prop({
    type: Date,
    required: true,
  })
  created_at: Date;
}

@Schema({ versionKey: false })
export class User extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    index: true,
    trim: true,
    parse: true,
  })
  username: string;

  @Prop({
    type: String,
    index: true,
    default: null,
    trim: true,
    parse: true,
  })
  email: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  email_verified: Boolean;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  current_password: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  current_salt: string;

  @Prop({
    type: [UsedPassword],
    default: [],
    select: false,
  })
  used_passwords: [UsedPassword];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: Group.name,
    default: null,
    index: true,
  })
  group?: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    enum: ACCOUNT_TYPE,
    required: true,
    index: true,
  })
  type: string;

  @Prop({
    type: [String],
    required: function (this: User) {
      return Common.compareValues(this.type, ACCOUNT_TYPE.ADMIN);
    },
    default: [],
  })
  permissions: string[];

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
    required: false,
  })
  last_login_at: Date;

  @Prop({
    type: String,
    trim: true,
    default: null,
  })
  image: string;
}

export type UserDocument = HydratedDocument<User>;

export interface IUser extends Partial<User> {
  _id?: any;
  menus?: IPermissionFrame[];
}

export interface IUsedPassword extends UsedPassword {}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 'text', email: 'text' });
