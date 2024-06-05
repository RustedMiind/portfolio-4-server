import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FileService, storage } from 'src/file/file.service';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';
import { CreateDto } from './dto/createDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/functions/imageFileFilter';
import { Url } from 'src/decorators/Url.decorator';
import { UpdateDto } from './dto/updateDto';
import { ParseFormDataBooleanPipe } from 'src/decorators/ParseFormDataBooleanPipe';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  async getProducts(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe)
    limit?: number,
    @Query('featured', new DefaultValuePipe(false), ParseBoolPipe)
    featured?: boolean,
  ) {
    const products = await this.projectService.getAllProjects({
      limit,
      featured,
    });
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const products = await this.projectService.getProjectById(id);
    return products;
  }

  @Post()
  @Permission(PermissionName.CREATE_PROJECT)
  @UseInterceptors(
    FilesInterceptor('image[]', undefined, {
      fileFilter: imageFileFilter,
      storage,
    }),
  )
  async createProject(
    @Body(ValidationPipe) dto: CreateDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Url() url: string,
    @Body('featured', new DefaultValuePipe(false), ParseFormDataBooleanPipe)
    featured?: boolean,
  ) {
    const { toolsIds, ...createInputs } = dto;
    const filesDetails = this.fileService.filesDetails(files, url);
    if (!filesDetails?.[0]) {
      throw new UnprocessableEntityException('Image must be provided');
    }
    const createdProduct = await this.projectService.createProject(
      {
        ...createInputs,
        featured,
        image: filesDetails[0].url,
      },
      toolsIds,
    );
    return createdProduct;
  }

  @Patch(':id')
  @Permission(PermissionName.UPDATE_PROJECT)
  @UseInterceptors(
    FilesInterceptor('image[]', undefined, {
      fileFilter: imageFileFilter,
      storage,
    }),
  )
  async updateCreatedProduct(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDto,
    @Url() url: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('featured', new DefaultValuePipe(false), ParseFormDataBooleanPipe)
    featured?: boolean,
  ) {
    const { toolsIds, ...updateInputs } = dto;
    const filesDetails = this.fileService.filesDetails(files, url);
    const createdProduct = await this.projectService.updateProject(
      id,
      {
        ...updateInputs,
        featured,
        image: filesDetails[0]?.url ?? undefined,
      },
      toolsIds,
    );
    return createdProduct;
  }

  @Delete(':id')
  @Permission(PermissionName.DELETE_PROJECT)
  async deleteTool(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
