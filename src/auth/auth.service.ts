import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.hash == password) {
      delete user.email;
      delete user.hash;
      return user;
    } else {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
