import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        const isSamePassword = await this.hashService.comparePasswords(
          password,
          user.hash,
        );
        delete user.email;
        delete user.hash;
        if (isSamePassword) return user;
        else
          throw new HttpException(
            'Email or password is incorrect',
            HttpStatus.FORBIDDEN,
          );
      } else {
        throw new HttpException(
          'Email or password is incorrect',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
