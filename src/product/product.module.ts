import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [AuthModule, UserModule, JwtModule],
})
export class ProductModule {}
