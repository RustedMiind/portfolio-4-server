import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationOptions } from 'src/types';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
      });
      if (product) return product;
      throw new NotFoundException(
        'Product you are looking for does not exist, or it might be deleted.',
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  // Get products that user have created
  async getProductsByUser(userId: string, paginate: PaginationOptions) {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          createdById: userId,
        },
        skip: (paginate.page - 1) * paginate.rows,
        take: paginate.rows,
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createProduct(product: ProductInput, createdBy: string) {
    try {
      const createdProduct = this.prismaService.product.create({
        data: { ...product, createdById: createdBy },
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

type ProductInput = {
  name: string;
  description: string;
  price: number;
};
