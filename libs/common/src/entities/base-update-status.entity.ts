import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseUpdateStatusEntity {
  constructor(object: any) {
    this.status = object?.status;
  }

  @IsNotEmpty()
  @ApiProperty({
    required: false,
    description: 'Trạng thái',
    example: 'ACTIVE',
  })
  status: string;
}
