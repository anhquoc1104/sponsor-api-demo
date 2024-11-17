import { BaseCreateEntity } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAttributeEntity {
  constructor(object: any) {
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
    type: Date,
    description: 'path hình ảnh',
    example: '/public/image/followme.jpg',
  })
  image: string;
}
