import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAccessTokenPayload } from '../jwt/interfaces/jwt.interface';
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IAccessTokenPayload;
  },
);
