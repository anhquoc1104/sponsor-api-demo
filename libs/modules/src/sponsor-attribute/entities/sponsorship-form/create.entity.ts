import { CommonCreateAttributeEntity } from '../create-common.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeSponsorshipFormEntity extends CommonCreateAttributeEntity {
  constructor(object: any) {
    super(object);
    this.sponsor_benefit = object?.sponsor_benefit;
  }

  @ApiProperty({
    required: false,
    description: 'Nhóm quyền lợi tài trợ',
    example: '66dd09d8965b73312df0613b',
  })
  sponsor_benefit: string;
}
