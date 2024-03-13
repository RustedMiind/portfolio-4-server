import { UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from './permission.guard';

export const CheckPermission = Reflector.createDecorator<string>();

export function Permission(permission?: string) {
  return applyDecorators(
    UseGuards(AuthGuard, PermissionGuard),
    CheckPermission(permission),
  );
}
