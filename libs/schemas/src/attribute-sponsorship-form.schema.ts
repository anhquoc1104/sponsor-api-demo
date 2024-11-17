import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';
import { AttributeSponsorshipBenefit } from './attribute-sponsorship-benefit.schema';
// Hình thức tài trợ
@Schema({ versionKey: false })
export class AttributeSponsorshipForm extends AttributeCommonSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refs: AttributeSponsorshipBenefit.name,
  })
  sponsor_benefit: mongoose.Schema.Types.ObjectId; // Nhóm quyền lơi tài trợ
}

export type AttributeSponsorshipFormDocument =
  HydratedDocument<AttributeSponsorshipForm>;

export interface IAttributeSponsorshipForm
  extends Partial<AttributeSponsorshipForm> {
  _id?: any;
}

export const AttributeSponsorshipFormSchema = SchemaFactory.createForClass(
  AttributeSponsorshipForm,
);

AttributeSponsorshipFormSchema.index({ name: 'text' });
