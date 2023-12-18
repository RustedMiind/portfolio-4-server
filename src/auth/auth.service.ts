import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user || !(await this.isValidPassword(password, user.hash))) {
        this.incorrectData();
      }

      // If the user is valid, remove sensitive data and return
      delete user.email;
      delete user.hash;
      const token = this.jwtService.create(user.id);
      return { user, token };
    } catch (error) {
      this.incorrectData();
    }
  }

  private async isValidPassword(
    plainTextPassword: string,
    hash: string,
  ): Promise<boolean> {
    return this.hashService.comparePasswords(plainTextPassword, hash);
  }

  private incorrectData() {
    throw new HttpException(
      'Email or password is incorrect',
      HttpStatus.FORBIDDEN,
    );
  }
}
