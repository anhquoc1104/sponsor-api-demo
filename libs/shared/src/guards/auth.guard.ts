import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Scope,
  HttpStatus,
} from '@nestjs/common';
import { JwtConfigStrategy } from '../jwt/jwt.strategy';
import { Reflector } from '@nestjs/core';
import { OnlyVerify, Unprotected } from '../decorators';
import { ACCOUNT_TYPE, Common } from '@app/common';
import { IAccessTokenPayload } from '../jwt/interfaces/jwt.interface';
import { throwErrorMessage } from '../filters';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { PERMISSION } from '@app/common/enums/permission.enum';
import { AuthConfigStrategy } from '@app/modules/blacklist/auth.strategy';
@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtConfigService: JwtConfigStrategy,
    private readonly reflector: Reflector,
    private readonly authConfigStrategy: AuthConfigStrategy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const unprotected = this.reflector.get(Unprotected, context.getHandler());
    if (!unprotected) {
      const requiredRoles = this.reflector.getAllAndOverride<ACCOUNT_TYPE[]>(
        'roles',
        [context.getHandler(), context.getClass()],
      );
      const requiredPermission = this.reflector.getAllAndOverride<PERMISSION[]>(
        'permission',
        [context.getHandler(), context.getClass()],
      );
      const response = (await this.jwtConfigService.validate(
        request?.headers?.authorization,
      )) as IAccessTokenPayload;
      const { is_revoked } = await this.authConfigStrategy.checkTokenStatus(
        request?.headers?.authorization,
      );
      if (is_revoked) {
        throwErrorMessage(
          { error_code: ERROR_CODE.AUTH.UNAUTHORIZED },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const onlyVerify = this.reflector.get(OnlyVerify, context.getHandler());
      if (
        !onlyVerify &&
        (!requiredRoles?.includes(response?.account_type) ||
          (Common.compareValues(response.account_type, ACCOUNT_TYPE.ADMIN) &&
            // !response?.permissions?.includes(requiredPermission)))
            !this.checkActivePermission(
              requiredPermission,
              response?.permissions,
            )))
      ) {
        throwErrorMessage(
          { error_code: ERROR_CODE.AUTH.FORBIDDEN },
          HttpStatus.FORBIDDEN,
        );
      }
      request.user = response;
    }
    return true;
  }

  checkActivePermission(
    requiredPermissions: string[],
    responsePermissions: string[],
  ) {
    const is_active = requiredPermissions?.find((item) =>
      responsePermissions?.includes(item),
    );
    return !!is_active;
  }
}
