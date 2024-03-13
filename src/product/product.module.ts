import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [AuthModule, UserModule, JwtModule, FileModule],
})
export class ProductModule {}
