import {
  Type,
  mixin,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from 'src/jwt/jwt.service';

export const PermissionGuard = (permission: string): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
    ) {}
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
      let hasPermission: boolean = false;
      try {
        const decode = this.jwtService.decode(token) as Partial<{ id: string }>;
        if (!(token && decode)) {
          return false;
        }
        if (typeof decode?.id !== 'string') return false;

        const userData = await this.userService.getUserByIdWithPermissions(
          decode?.id,
        );
        request.user = userData;
        const userPermissions = userData.role.permissions;
        hasPermission = userPermissions.some(
          (userPermission) => userPermission.name === permission,
        );
      } catch (error) {
        hasPermission = false;
      } finally {
        if (hasPermission) return true;
        throw new HttpException(
          `User has no ( ${permission} ) permission`,
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
    }
  }

  return mixin(PermissionGuardMixin);
};
