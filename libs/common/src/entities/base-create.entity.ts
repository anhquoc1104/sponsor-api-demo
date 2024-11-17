import { ApiProperty } from '@nestjs/swagger';

export class BaseCreateEntity {
  constructor(object: any) {
    this.status = object?.status;
    this.created_at = object?.created_at;
    this.created_by = object?.created_by;
    this.updated_at = object?.updated_at;
    this.updated_by = object?.updated_by;
  }

  @ApiProperty({
    required: false,
    description: 'Trạng thái',
    example: 'ACTIVE',
  })
  status: string;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Ngày tạo',
    example: '2020-10-07 02:32:49.299Z',
  })
  readonly created_at: Date;

  @ApiProperty({
    required: false,
    description: 'Ngày update',
    example: '2020-10-07 02:32:49.299Z',
  })
  readonly updated_at: Date;

  @ApiProperty({
    required: false,
    type: String,
    example: [
      {
        _id: '5f8e4f8a266d7225a5da3c86',
        name: 'Nguyễn văn A',
      },
    ],
    description: 'User tạo Id',
  })
  created_by: any;

  @ApiProperty({
    required: false,
    type: String,
    example: [
      {
        _id: '5f8e4f8a266d7225a5da3c86',
        name: 'Nguyễn văn A',
      },
    ],
    description: 'User Cập nhật Id',
  })
  updated_by: any;
}
