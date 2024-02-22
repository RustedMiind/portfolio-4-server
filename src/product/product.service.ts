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
        include: { ...this.includeProductImages },
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
        include: { ...this.includeProductImages },
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
        include: { ...this.includeProductImages },
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProduct(
    product: Partial<ProductInput>,
    productId: string,
    // Add CreatedById if you want to strict the update only for product creator
    createdById?: string,
  ) {
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id: productId, createdById },
        data: product,
        include: { ...this.includeProductImages },
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
        include: { ...this.includeProductImages },
      });
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'Product not exist or have no permission to delete it',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async AddProjectImages(
    productId: string,
    imagePaths?: string[],
    createdById?: string,
  ) {
    if (!Array.isArray(imagePaths))
      throw new BadRequestException('Bad images format');
    try {
      const product = await this.prismaService.product.update({
        where: {
          id: productId,
          ...(createdById ? { createdById } : undefined),
        },
        data: {
          images: {
            createMany: {
              data: imagePaths.map((imageUrl) => ({
                imageUrl,
              })),
            },
          },
        },
        include: { ...this.includeProductImages },
      });
      return product;
    } catch (error) {
      throw new HttpException(
        'Cannot add images to project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProductImage(
    productId: string,
    imageId: string,
    // Add CreatedById if you want to strict the update only for product creator
    createdById?: string,
  ) {
    try {
      const product = await this.prismaService.product.update({
        where: { id: productId, createdById },
        data: { images: { delete: { id: imageId } } },
        include: this.includeProductImages,
      });
      return product;
    } catch (error) {
      throw new BadRequestException("Couln't Delete the product image");
    }
  }

  private readonly includeProductImages = { images: true };
}

type ProductInput = {
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
};
