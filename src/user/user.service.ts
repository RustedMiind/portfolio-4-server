import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
  ) {}

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async createUser(userData: Prisma.UserCreateInput) {
    try {
      const password = await this.hash.hashPassword(userData.hash);
      const user = await this.prisma.user.create({
        data: { ...userData, hash: password },
      });
      return user;
    } catch (error) {
      this.handleCreateUserError(error);
    }
  }

  handleCreateUserError(error: any) {
    if (
      error &&
      error.code === 'P2002' &&
      error.meta?.target?.includes('email')
    ) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    } else {
      // Default error handling
      throw new HttpException('Error occurred', HttpStatus.BAD_REQUEST);
    }
  }
}
