import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseUpdateStatusDTO {
  @IsNotEmpty()
  @IsIn(['ACTIVE', 'INACTIVE'], {
    message: '$constraint1',
  })
  @ApiProperty({
    example: 'ACTIVE',
    description: 'Trạng thái',
    required: true,
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: string;
}
