import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashModule } from './hash/hash.module';
import { JwtModule } from './jwt/jwt.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { join } from 'path';
import { VariablesModule } from './variables/variables.module';
import { ProjectModule } from './project/project.module';
import { ExperienceModule } from './experience/experience.module';
import { ToolModule } from './tool/tool.module';
import { MailerModule } from './mailer/mailer.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    HashModule,
    JwtModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), // Specify the path where uploaded files are stored
      serveRoot: '/uploads',
    }),
    VariablesModule,
    ProjectModule,
    ExperienceModule,
    ToolModule,
    MailerModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
