import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  controllers: [ToolController],
  providers: [ToolService],
  imports: [UserModule, JwtModule],
})
export class ToolModule {}
