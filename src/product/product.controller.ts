import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from 'src/auth/GetUserDecorator';
import { RequestUserType } from 'src/auth/types/RequestUserType';
import { CreateDto } from './dto/createDto';
import { UpdateDto } from './dto/updateDto';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService, storage } from 'src/file/file.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Url } from 'src/decorators/Url.decorator';

// Define a function to validate file mimetype
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

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

  @Get('mine')
  @UseGuards(AuthGuard)
  async getMyProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    @GetUser() user: RequestUserType,
  ) {
    const products = await this.productService.getProductsByUser(user.id, {
      page: page,
      rows: perPage,
    });
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const products = await this.productService.getProductById(id);
    return products;
  }

  @Post()
  @UseGuards(AuthGuard)
  @Permission(PermissionName.CREATE_PRODUCT)
  async createProduct(
    @GetUser() user: RequestUserType,
    @Body() dto: CreateDto,
  ) {
    try {
      const createdProduct = await this.productService.createProduct(
        dto,
        user.id,
      );
      return createdProduct;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Patch(':id')
  @Permission(PermissionName.CREATE_PRODUCT)
  async updateCreatedProduct(
    @GetUser() user: RequestUserType,
    @Param('id') id: string,
    @Body() dto: UpdateDto,
  ) {
    const createdProduct = await this.productService.updateProduct(
      dto,
      id,
      user.id,
    );
    return createdProduct;
  }

  @Patch('admin/:id')
  @Permission(PermissionName.UPDATE_PRODUCT)
  async updateAnyProduct(@Param('id') id: string, @Body() dto: UpdateDto) {
    const createdProduct = await this.productService.updateProduct(dto, id);
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

  @Post('images/:id')
  @Permission(PermissionName.CREATE_PRODUCT)
  @UseInterceptors(
    FilesInterceptor('images[]', undefined, {
      fileFilter: imageFileFilter,
      storage,
    }),
  )
  async setImagesToProject(
    @GetUser() user: RequestUserType,
    @UploadedFiles() files: Express.Multer.File[],
    @Headers('host') host: string,
    @Param(
      'id',
      new DefaultValuePipe('default'),
      new ParseUUIDPipe({ version: '4' }),
    )
    id: string,
    @Url() url: string,
  ) {
    try {
      const filesDetails = this.fileService.filesDetails(files, url);
      return this.productService.AddProjectImages(
        id,
        filesDetails?.map((file) => file.url),
        user.id,
      );
    } catch (error) {
      throw new BadRequestException('Unexpected body');
    }
  }

  @Delete('images/:productId/:imageId')
  @UseGuards(AuthGuard)
  async deleteProductImage(
    @GetUser() user: RequestUserType,
    @Param(
      'productId',
      new DefaultValuePipe('default'),
      new ParseUUIDPipe({ version: '4' }),
    )
    productId: string,
    @Param(
      'imageId',
      new DefaultValuePipe('default'),
      new ParseUUIDPipe({ version: '4' }),
    )
    imageId: string,
  ) {
    try {
      return this.productService.deleteProductImage(
        productId,
        imageId,
        user.id,
      );
    } catch (error) {
      throw new BadRequestException('Unexpected body');
    }
  }
}
