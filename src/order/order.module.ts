import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [UserModule, JwtModule],
})
export class OrderModule {}
