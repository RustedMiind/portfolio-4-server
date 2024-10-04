import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { AuthGuard } from './auth.guard';
import { GetUser } from './GetUserDecorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return user;
  }
  @Get('user')
  @UseGuards(AuthGuard)
  async getUserData(@GetUser() user?: User) {
    delete user?.hash;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  getHello(@GetUser() user: User) {
    return user;
  }
}
