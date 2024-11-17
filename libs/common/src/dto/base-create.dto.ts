import { IsOptional, IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_STATUS } from '../enums';

export class BaseCreateDTO {
  @IsOptional()
  @IsString()
  @IsIn([ENUM_STATUS.ACTIVE, ENUM_STATUS.ACTIVE], {
    message: '$constraint1',
  })
  @ApiProperty({
    required: false,
    description: 'Trạng thái',
    enum: ENUM_STATUS,
    example: ENUM_STATUS.ACTIVE,
  })
  status = ENUM_STATUS.ACTIVE;

  created_at?: Date;

  created_by?: any;

  updated_by?: any;

  updated_at?: Date;
}
