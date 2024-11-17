export class InsertNotifyDTO {
  constructor(props) {
    this.model_name = props.model_name;
    this.oldData = props.oldData;
    this.newData = props.newData;
  }

  model_name: string;

  oldData: any;

  newData: any;
}
