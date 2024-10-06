import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  providers: [AttendanceService],
  controllers: [AttendanceController],
  imports: [UserModule, JwtModule, HashModule],
})
export class AttendanceModule {}
