import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CheckPermission } from './permission.decorator';
import { RequestUserType } from 'src/auth/types/RequestUserType';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const permission = this.reflector.get(
      CheckPermission,
      context.getHandler(),
    );
    if (!permission) return true;
    const request = context.switchToHttp().getRequest();
    const user: RequestUserType | undefined = request.user as
      | RequestUserType
      | undefined;
    if (!user)
      throw new HttpException(
        'Auth guard must be called before permission guard',
        HttpStatus.FAILED_DEPENDENCY,
      );
    if (!user.role) throw new ForbiddenException('User has no role yet');
    if (
      user.role?.permissions?.some(
        (userPermission) => userPermission.name === permission,
      )
    )
      return true;

    return false;
  }
  order = 1;
}
