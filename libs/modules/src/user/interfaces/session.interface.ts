import { SESSION_TYPE } from '@app/common/enums/emitter.enum';
import { IUser } from '@app/schemas';
import {
  IRefreshTokenPayload,
  ITokenGenerateResponse,
} from '@app/shared/jwt/interfaces/jwt.interface';

export interface IEmitterSessionResponse {
  data: ITokenGenerateResponse | IRefreshTokenPayload;
  user?: IUser;
  type: SESSION_TYPE;
  refreshData?: ITokenGenerateResponse;
}
