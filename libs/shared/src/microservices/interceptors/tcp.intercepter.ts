import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class TCPInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc();
    let { data } = rpcContext.getData();
    if (data) {
      data = this.convertQuery(data);
    }
    return next.handle();
  }

  private convertQuery(data: any | any[]): any {
    if (_.isObject(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (_.isObject(value) || _.isArray(value)) {
          data[key] = this.convertQuery(value);
        } else if (
          typeof value === 'string' &&
          value.length === 24 &&
          Types.ObjectId.isValid(value)
        ) {
          data[key] = new Types.ObjectId(value);
        }
      });
    } else if (_.isArray(data)) {
      data.forEach((element, index) => {
        if (_.isObject(element) || _.isArray(element)) {
          data[index] = this.convertQuery(element);
        } else if (
          typeof element === 'string' &&
          element.length === 24 &&
          Types.ObjectId.isValid(element)
        ) {
          data[index] = new Types.ObjectId(element);
        }
      });
    }
    return data;
  }
}
