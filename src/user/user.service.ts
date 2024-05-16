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
        include: { ...this.includeImage },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: { ...this.includeImage },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getUserByIdWithPermissions(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          role: { include: { permissions: true, ...this.includeImage } },
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: { ...this.includeImage },
      });
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

  async setUserProfileImage(userId: string, filePath: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          profileImage: filePath,
        },
      });
      return user;
    } catch (err) {
      // throw new BadRequestException('Cant assign image to user');
      throw new HttpException('Cant assign image to user', 500);
    }
  }

  async createAdminAccount() {
    const allPermissions = await this.prisma.permission.findMany();
    const user = await this.createUser({
      email: process.env.ADMIN_EMAIL,
      hash: process.env.ADMIN_PASSWORD,
      role: {
        create: {
          name: 'admin',
          permissions: { connect: allPermissions.map((p) => ({ id: p.id })) },
        },
      },
    });
    return user;
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

  private readonly includeImage = {};
}
