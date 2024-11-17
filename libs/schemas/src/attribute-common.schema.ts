import { Prop } from '@nestjs/mongoose';
import { BaseSchema } from './base';
export abstract class AttributeCommonSchema extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    index: true,
    trim: true,
    parse: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    index: true,
    trim: true,
  })
  description: string;

  @Prop({
    type: String,
    trim: true,
  })
  image: string;
}
