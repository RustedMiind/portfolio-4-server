import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashModule } from 'src/hash/hash.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [HashModule, PermissionModule, RoleModule, JwtModule, FileModule],
})
export class UserModule {}
