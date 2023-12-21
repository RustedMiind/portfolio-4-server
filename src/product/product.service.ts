import {
  BadRequestException,
  HttpException,
  HttpStatus,
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

  // Get products
  async getProducts(paginate: PaginationOptions) {
    try {
      const products = await this.prismaService.product.findMany({
        skip: (paginate.page - 1) * paginate.rows,
        take: paginate.rows,
        orderBy: { price: 'asc' },
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createProduct(product: ProductInput, createdById: string) {
    try {
      const createdProduct = this.prismaService.product.create({
        data: { ...product, createdById },
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProduct(
    product: Partial<ProductInput>,
    productId: string,
    createdById: string,
  ) {
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id: productId, createdById },
        data: product,
      });
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'Product not exist or have no permission to update it',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProduct(productId: string, createdById: string) {
    try {
      const updatedProduct = await this.prismaService.product.delete({
        where: { id: productId, createdById },
      });
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'Product not exist or have no permission to delete it',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

type ProductInput = {
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
};
