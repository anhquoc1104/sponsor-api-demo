import { ApiProperty } from '@nestjs/swagger';
import { BaseCreateEntity } from '@app/common';

export class CreateSettingEntity extends BaseCreateEntity {
  constructor(object: any) {
    super(object);
    this.name = object?.name;
    this.key = object?.key;
    this.type = object?.type;
    this.description = object?.description;
    this.value = object?.value;
  }
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'config mail',
  })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'MAIL_CONFIG',
  })
  key: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'type of setting',
    example: 'OBJECT',
  })
  type: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'description of setting',
    example: 'description',
  })
  description: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Value of setting',
    example: 'value',
  })
  value: string;
}
