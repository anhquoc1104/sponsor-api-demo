import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@app/common';

export class UpdateSettingDTO extends BaseUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'config mail',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'MAIL_CONFIG',
  })
  key: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'description of setting',
    example: 'description',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Value of setting',
    example: 'description',
  })
  value: string;
}
