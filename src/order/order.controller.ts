import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';
import { CreateOrderDto } from './dto/CreateDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/GetUserDecorator';
import { User } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Permission(PermissionName.READ_ORDER)
  async listAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return orders;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createNewOrder(
    @Body(ValidationPipe) dto: CreateOrderDto,
    @GetUser() user: User,
  ) {
    console.log('user: ', user);
    const createdOrder = await this.orderService.createOrder(
      dto.products,
      user.id,
    );
    return createdOrder;
  }
}
