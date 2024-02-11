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
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { FileModule } from './file/file.module';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    HashModule,
    JwtModule,
    ProductModule,
    OrderModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Specify the path where uploaded files are stored
      serveRoot: '/dist/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
