import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from 'src/auth/GetUserDecorator';
import { RequestUserType } from 'src/auth/types/RequestUserType';
import { CreateDto } from './dto/createDto';
import { UpdateDto } from './dto/updateDto';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Permission(PermissionName.MANAGE_ROLE)
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
  @Permission(PermissionName.CREATE_PRODUCT)
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

  @Patch(':id')
  @Permission(PermissionName.UPDATE_PRODUCT)
  async updateProduct(
    @GetUser() user: RequestUserType,
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDto,
  ) {
    const createdProduct = await this.productService.updateProduct(
      dto,
      id,
      user.id,
    );
    return createdProduct;
  }

  @Delete(':id')
  @Permission(PermissionName.DELETE_PRODUCT)
  async deleteProduct(
    @GetUser() user: RequestUserType,
    @Param('id') id: string,
  ) {
    const createdProduct = await this.productService.deleteProduct(id, user.id);
    return createdProduct;
  }
}
