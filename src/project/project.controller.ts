import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  async getProducts() {
    const products = await this.projectService.getAllProjects();
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
  ) {
    const filesDetails = this.fileService.filesDetails(files, url);
    if (!filesDetails?.[0]) {
      throw new UnprocessableEntityException('Image must be provided');
    }
    const createdProduct = await this.projectService.createProject({
      ...dto,
      image: filesDetails[0].url,
    });
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
  ) {
    const filesDetails = this.fileService.filesDetails(files, url);
    const createdProduct = await this.projectService.updateProject(id, {
      ...dto,
      image: filesDetails[0]?.url ?? undefined,
    });
    return createdProduct;
  }

  @Delete(':id')
  @Permission(PermissionName.DELETE_PROJECT)
  async deleteTool(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
