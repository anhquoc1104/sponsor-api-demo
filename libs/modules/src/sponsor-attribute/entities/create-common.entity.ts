import { BaseCreateEntity } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class CommonCreateAttributeEntity extends BaseCreateEntity {
  constructor(object: any) {
    super(object);
    this.name = object?.name;
    this.description = object?.description;
    this.image = object?.image;
  }

  @ApiProperty({
    required: true,
    description: 'Id',
    example: 'vtv',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Mô tả ',
    example: 'This is description',
  })
  description: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'path hình ảnh',
    example: '/public/image/followme.jpg',
  })
  image: string;
}
