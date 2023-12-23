import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Reflector } from '@nestjs/core';
import { Permission } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const permission = this.reflector.get(Permission, context.getHandler());
    if (!permission) return true;
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
      const userPermissions = userData.role?.permissions;
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
