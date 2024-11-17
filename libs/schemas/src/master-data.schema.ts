import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
@Schema({ versionKey: false })
export class MasterData extends BaseSchema {
  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
    sparse: true,
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
    sparse: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MasterData.name,
  })
  parent: mongoose.Schema.Types.ObjectId;
}

export type MasterDataDocument = HydratedDocument<MasterData>;

export interface IMasterData extends MasterDataDocument {}

export const MasterDataSchema = SchemaFactory.createForClass(MasterData);
