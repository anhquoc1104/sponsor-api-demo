import { ENUM_MODEL } from '@app/common/enums';

export class InsertEventsDTO {
  constructor(props) {
    this.model_name = props.model_name;
    this.oldData = props.oldData;
    this.newData = props.newData;
    this.actionType = props.actionType;
    this.relatedModel = props?.relatedModel ?? false;
  }

  model_name: ENUM_MODEL;

  oldData: any;

  newData: any;

  actionType: string;

  relatedModel?: ENUM_MODEL;
}
