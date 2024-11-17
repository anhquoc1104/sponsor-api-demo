import { IsMongoId, IsOptional } from 'class-validator';
import { CommonCreateAttributeDTO } from '../create-common.dto';

export class CreateAttributeSponsorshipFormDTO extends CommonCreateAttributeDTO {
  @IsOptional()
  @IsMongoId()
  sponsor_benefit: string;
}
