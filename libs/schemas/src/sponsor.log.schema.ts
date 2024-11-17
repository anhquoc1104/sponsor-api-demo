import { LOG_ACTION } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class SponsorLog extends mongoose.Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sponsor',
    required: true,
  })
  sponsor: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  created_by: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  updated_by: mongoose.Schema.Types.ObjectId;

  // @Prop({ type: Date, default: Date.now })
  // update_time: Date;

  // @Prop({ type: [String], required: true })
  // updated_fields: string[]; // Tên các trường được cập nhật

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  previous_data: Record<string, any>; // Giá trị trước khi cập nhật

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  updated_data: Record<string, any>; // Giá trị sau khi cập nhật

  @Prop({ type: String, required: true, default: LOG_ACTION.UPDATE })
  action: string;
}

export type SponsorLogDocument = mongoose.HydratedDocument<SponsorLog>;

export interface ISponsorLog extends SponsorLogDocument {}

export const SponsorLogSchema = SchemaFactory.createForClass(SponsorLog);

SponsorLogSchema.index({ created_at: 1 }, { expireAfterSeconds: 25920000 }); // 300 days
