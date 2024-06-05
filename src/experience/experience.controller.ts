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
  ValidationPipe,
} from '@nestjs/common';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';
import { CreateDto } from './dto/createDto';
import { UpdateDto } from './dto/updateDto';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async getExperiences(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe)
    @Query('featured', ParseBoolPipe)
    featured: boolean,
    limit?: number,
  ) {
    const experiences = await this.experienceService.getAllExperiences({
      limit,
      featured,
    });
    return experiences;
  }

  @Get(':id')
  async getExperienceById(@Param('id', new ParseUUIDPipe()) id: string) {
    const experiences = await this.experienceService.getExperienceById(id);
    return experiences;
  }

  @Post()
  @Permission(PermissionName.CREATE_EXPERIENCE)
  async createExperience(@Body(ValidationPipe) dto: CreateDto) {
    const { toolsIds, ...createInputs } = dto;
    // return;
    const createdExperience = await this.experienceService.createExperience(
      createInputs,
      toolsIds,
    );
    return createdExperience;
  }

  @Patch(':id')
  @Permission(PermissionName.UPDATE_EXPERIENCE)
  async updateCreatedExperience(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDto,
  ) {
    const { toolsIds, ...updateInputs } = dto;
    const createdExperience = await this.experienceService.updateExperience(
      id,
      updateInputs,
      toolsIds,
    );
    return createdExperience;
  }

  @Delete(':id')
  @Permission(PermissionName.DELETE_EXPERIENCE)
  async deleteTool(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.experienceService.deleteExperience(id);
  }
}
