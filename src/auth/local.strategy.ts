import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // Specifying that 'email' field will be used as username
      passwordField: 'hash', // Assuming a 'password' field is received from the user
    });
  }

  async validate(email: string, hash: string) {
    const user = await this.authService.validateUser(email, hash);

    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.email;
    delete user.hash;
    return user;
  }
}
