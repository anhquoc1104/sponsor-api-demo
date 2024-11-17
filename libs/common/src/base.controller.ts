import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import {
  BaseForbiddenResponseDTO,
  BaseServerErrorResponseDTO,
  BaseUnauthorizedResponseDTO,
} from './dto';
import { RESPONSE } from './enums';
import { Inject } from '@nestjs/common';
import { LoggerService } from '@app/shared';
import { AuthConfigStrategy } from '@app/modules/blacklist/auth.strategy';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { Common } from './functions';

@ApiUnauthorizedResponse({
  type: BaseUnauthorizedResponseDTO,
  isArray: false,
})
@ApiInternalServerErrorResponse({
  type: BaseServerErrorResponseDTO,
  isArray: false,
})
@ApiForbiddenResponse({
  type: BaseForbiddenResponseDTO,
  isArray: false,
})
export class BaseController {
  protected model_name;
  @Inject() i18n: I18nService;
  @Inject() logger: LoggerService;
  @Inject() test: AuthConfigStrategy;
  constructor() {}

  async createControllerByUser(
    payload: any,
    user: IAccessTokenPayload = null,
  ): Promise<any> {
    payload.created_at = new Date();
    payload.updated_at = new Date();
    if (user) {
      payload.created_by = Common.toObjectId(user.sub);
      payload.updated_by = Common.toObjectId(user.sub);
    }
    return payload;
  }

  async updateControllerByUser(
    payload: any,
    user: IAccessTokenPayload = null,
  ): Promise<any> {
    payload.updated_at = new Date();
    if (user) {
      payload.updated_by = Common.toObjectId(user.sub);
    }
    return payload;
  }

  async returnResponse(
    result: any,
    type: RESPONSE,
  ): Promise<{ message: string; data: any }> {
    let message = '';
    switch (type) {
      case RESPONSE.CREATE:
        message = await this.i18n.translate('messages.MR0001', {
          args: {
            parameter:
              (await this.i18n.translate('models.' + this.model_name)) ?? '',
          },
        });
        break;

      case RESPONSE.UPDATE:
        message = await this.i18n.translate('messages.MR0002', {
          args: {
            parameter:
              (await this.i18n.translate('models.' + this.model_name)) ?? '',
          },
        });
        break;

      case RESPONSE.UPDATE_STATUS:
        message = await this.i18n.translate('messages.MR0003', {
          args: {
            parameter:
              (await this.i18n.translate('models.' + this.model_name)) ?? '',
          },
        });
        break;

      case RESPONSE.GET:
        message = await this.i18n.translate('messages.MR0004');
    }
    return {
      message,
      data: result,
    };
  }
}
