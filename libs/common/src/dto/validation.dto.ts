import { ENUM_VALIDATION_ACTION_TYPE } from '../enums';

export class ValidationFormDTO {
  _id: any;
  oldData: any;
  newData: any;
  actionType: ENUM_VALIDATION_ACTION_TYPE;
}
