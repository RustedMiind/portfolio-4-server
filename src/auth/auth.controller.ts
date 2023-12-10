import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async validateUser(@Request() req: any) {
    return req.user;
  }

  @Get('protected')
  getHello(@Request() req) {
    return req.user;
  }
}
