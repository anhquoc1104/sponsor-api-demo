import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as _ from 'lodash';
import { ACCOUNT_TYPE } from '../enums';
export class BaseAuthenticateRequestDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    required: true,
    example: 'toan.pham',
  })
  @IsString()
  @Transform(({ value }) => _.trim(value))
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    required: true,
    example: 'Toan23123@!',
  })
  @IsString()
  @Transform(({ value }) => _.trim(value))
  password: string;

  @IsOptional()
  @IsEnum(ACCOUNT_TYPE)
  @ApiHideProperty()
  type: string;
}

export class BaseRefreshTokenRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Refresh Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCIgO...',
    required: true,
  })
  refresh_token: string;
}

export class BaseLogoutRequestDTO extends BaseRefreshTokenRequestDTO {}
