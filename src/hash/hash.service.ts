import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 12);
    return hashed;
  }

  async comparePasswords(
    plainTextPassword?: string,
    hash?: string,
  ): Promise<boolean> {
    try {
      if (!(plainTextPassword && hash)) throw new Error();
      const passwordsSame = await bcrypt.compare(plainTextPassword, hash);
      return passwordsSame;
    } catch (err) {
      throw new HttpException('Not a valid hash', HttpStatus.BAD_REQUEST);
    }
  }
}
