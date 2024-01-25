import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prismaService.order.findMany();
    return orders;
  }

  async getUsersOrders(buyerId: string) {
    const orders = await this.prismaService.order.findMany({
      where: { buyerId },
      include: this.includeOrders,
    });
    return orders;
  }

  async getOrderById(orderId: string) {
    try {
      const orders = await this.prismaService.order.findUniqueOrThrow({
        where: { id: orderId },
        include: this.includeOrders,
      });
      return orders;
    } catch (error) {
      return new NotFoundException('Order you are looking for not found');
    }
  }

  async createOrder(
    productsToConnect: ProductInCreateOrder[],
    buyerId: string,
  ) {
    // Fetch products based on the given product IDs
    const products = await this.prismaService.product.findMany({
      where: { OR: productsToConnect.map((product) => ({ id: product.id })) },
    });

    // Calculate the total price of the order
    let sum = 0;
    products.forEach((product) => {
      const count: number = productsToConnect.find(
        (x) => x.id === product.id,
      ).count;
      sum += product.price * count;
    });

    // Create the order in the database
    try {
      const order = await this.prismaService.order.create({
        data: {
          // buyer: { connect: { id: buyerId } },
          buyerId,
          price: sum,
          orderItems: {
            createMany: {
              data: products.map((product) => {
                const count: number = productsToConnect.find(
                  (x) => x.id === product.id,
                ).count;
                return { price: product.price, count };
              }),
            },
          },
        },
        include: this.includeOrders,
      });
      return order;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException();
      }
    }
  }

  private readonly includeOrders = { orderItems: true };
}

export interface ProductInCreateOrder {
  id: string;
  count?: number;
}
