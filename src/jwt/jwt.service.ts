import { Injectable } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  decode(jwt?: string) {
    if (!jwt) return undefined;
    try {
      const decode = verify(jwt, process.env.SECRET_KEY as string);
      return decode;
    } catch (error) {
      return undefined;
    }
  }

  create(id: string, days: number = 1): string {
    const time = 1000 * 60 * 60 * 24 * days;
    const token = sign({ id }, process.env.SECRET_KEY as string, {
      expiresIn: time,
    });
    return token;
  }
}
