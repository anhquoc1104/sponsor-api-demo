import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
interface IError {
  message?: string;
  error_code?: string;
  i18nArgs?: object;
}

interface IServerResponse {
  status_code: number;
  timestamp: number;
  path: string;
  message: string | Array<any> | any;
  response_code?: string;
  duration?: string;
  method: string;
  code?: string;
  i18nArgs?: object;
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private _logger = new Logger(this.constructor.name);
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx?.getResponse();
    const request: any = ctx.getRequest();

    const responseMessage =
      exception instanceof HttpException
        ? (exception?.getResponse() as IError)
        : { message: (exception as Error).message, error_code: null };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this._logger.error(
      `UNHANDLED EXCEPTION ${JSON.stringify(exception?.getResponse?.() || exception)}`,
    );
    if ([HttpStatus.FORBIDDEN, HttpStatus.UNAUTHORIZED]?.includes(status)) {
      response.status(status).json({
        status_code: status,
        message: await this.i18n.translate(`errors.status_code.${status}`),
        error_code: responseMessage.error_code,
      });
    } else {
      let error_code = responseMessage?.error_code || null;
      const i18nArgs = responseMessage?.i18nArgs || null;

      let translatedMessage = error_code
        ? await this.i18n.translate(`errors.${error_code}`, {
            ...(i18nArgs && { args: i18nArgs }),
          })
        : responseMessage?.message || responseMessage;

      if (!translatedMessage) {
        translatedMessage = await this.i18n.translate('errors.system.error');
        error_code = 'system.error';
      }
      let responseData: IServerResponse = {
        status_code: status,
        timestamp: Date.now(),
        path: request.url,
        message: translatedMessage,
        method: request.method,
        ...(error_code && { error_code }),
      };
      if (exception instanceof HttpException && exception?.cause) {
        responseData.response_code = exception.cause.toString();
      }
      this._logger.error(`UNHANDLED EXCEPTION ${JSON.stringify(responseData)}`);
      response.status(status).json(responseData);
    }
  }
}

export function throwErrorMessage(
  exception: Partial<IError> = {},
  status_code = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  exception['error_code'] = exception?.error_code || 'system.error';
  exception['message'] =
    exception?.message ||
    'Đã xảy ra lỗi của hệ thống. Vui lòng liên hệ admin!.';
  throw new HttpException(exception, status_code);
}
