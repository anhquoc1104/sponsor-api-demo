import {
  ACCOUNT_TYPE,
  BaseCreateDTO,
  BaseQueryFilterDTO,
  BaseUpdateDTO,
  ENUM_STATUS,
} from '@app/common';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDTO extends BaseCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Group Name',
    example: 'toan.pham',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Group Description',
    example: 'toan.pham',
  })
  description: string;

  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: ACCOUNT_TYPE,
    description: 'Account Type',
    example: ACCOUNT_TYPE.ADMIN,
  })
  type: string;
}

export class FindGroupDTO extends BaseQueryFilterDTO {
  @IsEnum(ACCOUNT_TYPE)
  @IsOptional()
  @ApiProperty({
    required: true,
    type: String,
    enum: ACCOUNT_TYPE,
    description: 'Account Type',
    example: ACCOUNT_TYPE.ADMIN,
  })
  type: string;
}

export class UpdateGroupDTO extends IntersectionType(
  OmitType(CreateGroupDTO, ['type']),
  BaseUpdateDTO,
) {}

export class UpdateGroupStatusDTO extends BaseUpdateDTO {
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({
    required: true,
    type: String,
    description: 'Working Status',
    example: ENUM_STATUS.ACTIVE,
  })
  status: ENUM_STATUS;
}
