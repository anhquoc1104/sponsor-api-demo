import { BaseUpdateStatusEntity } from '@app/common/entities/base-update-status.entity';

export class UpdateStatusAttributeCastEntity extends BaseUpdateStatusEntity {
  constructor(object: any) {
    super(object);
  }
}
