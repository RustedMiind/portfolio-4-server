import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashModule } from './hash/hash.module';
import { JwtModule } from './jwt/jwt.module';
import { ProductModule } from './product/product.module';
import { PermissionGuard } from './user/permission/permission.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    HashModule,
    JwtModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, PermissionGuard],
})
export class AppModule {}
