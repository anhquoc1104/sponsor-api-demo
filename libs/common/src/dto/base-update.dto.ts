import { IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseUpdateDTO {
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'id',
  })
  _id: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Mã',
  })
  code: string;

  // @IsOptional()
  // @IsIn(['ACTIVE', 'INACTIVE'], {
  //   message: '$constraint1',
  // })
  // @ApiProperty({
  //   example: 'ACTIVE',
  //   description: 'Trạng thái',
  //   required: false,
  //   enum: ['ACTIVE', 'INACTIVE'],
  // })
  // status: string;

  updated_by?: any;

  updated_at?: Date;
}
