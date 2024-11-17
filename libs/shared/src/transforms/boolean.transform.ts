import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export function ToBoolean(): (target: any, key: string) => void {
  return Transform((value: any) => {
    let newData;
    if (typeof value === 'object')
      newData = value.value; // dont parse if its object
    else if (typeof value === 'string') newData = JSON.parse(value); // parse if its string

    switch (newData) {
      case 'true':
        return true;
        break;
      case true:
        return true;
        break;
      case '1':
        return true;
        break;
      case 1:
        return true;
        break;
      case '0':
        return false;
        break;
      case 0:
        return false;
        break;
      case 'false':
        return false;
        break;
      case false:
        return false;
        break;
      default:
        if (IsBoolean(newData)) {
          return Boolean(newData);
        }
        return newData;
        break;
    }
  });
}
