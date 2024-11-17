import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
export const Unprotected = Reflector.createDecorator<boolean>();

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const RequirePermission = (permission: string[]) =>
  SetMetadata('permission', permission);

export const OnlyVerify = Reflector.createDecorator<boolean>();
