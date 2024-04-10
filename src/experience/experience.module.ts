import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService],
  imports: [UserModule, JwtModule],
})
export class ExperienceModule {}
