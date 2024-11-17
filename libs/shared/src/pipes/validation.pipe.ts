import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import * as _ from 'lodash';
import {
  ERROR,
  PAYLOAD_ERROR,
  PAYLOAD_PROPERTY,
  SUB_PAYLOAD_ERROR,
} from '@app/common/enums/property.enum';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  @Inject()
  private readonly i18n: I18nService;

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errorsList = await validate(object);
    if (errorsList.length > 0) {
      let errors = [];
      for (const error of errorsList) {
        if (_.isEmpty(error.children)) {
          errors = errors.concat(await this.parseErrors(error));
        } else {
          for (const [index, item] of Object.entries(error.children)) {
            if (_.isArray(item.children) && item.children.length > 0) {
              for (const subItem of item.children) {
                errors = errors.concat(
                  await this.parseErrors(subItem, Number(index) + 1),
                );
              }
            } else {
              errors = errors.concat(await this.parseErrors(item));
            }
          }
        }
      }
      if (errors.length > 0) {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }

  async parseErrors(error: any, rowNumber: number = null) {
    const results = [];
    const propertyName = PAYLOAD_PROPERTY[error?.property];
    const keys = Object.keys(error.constraints);
    for (let key of keys) {
      let message = '';
      if (_.includes([ERROR.MIN_LENGTH, ERROR.MAX_LENGTH], key)) {
        const arrays = error?.constraints?.[key].split(' ');
        const number = arrays.find((e) => {
          return Number(e);
        });
        // message = `${propertyName || ''} (${error?.property}) ${PAYLOAD_ERROR[key]} ${number} kí tự!`;
        message = `${propertyName || ''} ${PAYLOAD_ERROR[key]} ${number} kí tự!`;
      } else {
        const description =
          SUB_PAYLOAD_ERROR[error.constraints[key]] ?? PAYLOAD_ERROR[key];
        // message = `${propertyName || ''} (${error?.property}) ${description}`;
        message = `${propertyName || ''} ${description}`;
      }
      results.push(
        rowNumber ? `Dữ liệu dòng thứ ${rowNumber}: ${message}` : message,
      );
    }
    return results;
  }
}
