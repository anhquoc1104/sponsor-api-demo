import { ENUM_STATUS } from '@app/common';
import { Prop } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import * as mongoose from 'mongoose';
export abstract class BaseSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  created_by: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Date,
    default: Date.now,
    timezone: 'Asia/Ho_Chi_Minh',
    required: false,
  })
  created_at: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  updated_by: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Date,
    default: Date.now,
    timezone: 'Asia/Ho_Chi_Minh',
    required: false,
  })
  updated_at: Date;

  @Prop({
    type: String,
    enum: ENUM_STATUS,
    default: ENUM_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_STATUS)
  status: ENUM_STATUS;
}
