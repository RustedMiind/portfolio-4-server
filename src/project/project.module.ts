import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [UserModule, JwtModule, FileModule],
})
export class ProjectModule {}
