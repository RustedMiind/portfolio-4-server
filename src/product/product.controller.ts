import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/GetUserDecorator';
import { RequestUserType } from 'src/auth/types/RequestUserType';
import { CreateDto } from './dto/createDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ) {
    const products = await this.productService.getProducts({
      page: page,
      rows: perPage,
    });
    return products;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @GetUser() user: RequestUserType,
    @Body(ValidationPipe) dto: CreateDto,
  ) {
    try {
      const createdProduct = await this.productService.createProduct(
        dto,
        user.id,
      );
      return createdProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
