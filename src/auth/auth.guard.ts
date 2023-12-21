import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    try {
      const decode = this.jwtService.decode(token) as Partial<{ id: string }>;
      if (!(token && decode)) {
        return false;
      }
      if (typeof decode?.id !== 'string') return false;

      const userData = await this.userService.getUserById(decode?.id);
      request.user = userData; // Attach user data to the request
      return true;
    } catch (error) {
      return false;
    }
  }

  order = 1;
}
