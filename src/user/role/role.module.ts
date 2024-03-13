import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserService } from '../user.service';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  providers: [RoleService, UserService, HashService, JwtService],
  controllers: [RoleController],
})
export class RoleModule {}
