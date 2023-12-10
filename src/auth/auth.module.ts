import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { HashModule } from 'src/hash/hash.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, PassportModule, HashModule],
})
export class AuthModule {}
