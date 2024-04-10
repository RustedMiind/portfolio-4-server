import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
  async getExperiences() {
    const experiences = await this.experienceService.getAllExperiences();
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
    console.log(dto);
    // return;
    const createdExperience =
      await this.experienceService.createExperience(dto);
    return createdExperience;
  }

  @Patch(':id')
  @Permission(PermissionName.UPDATE_EXPERIENCE)
  async updateCreatedExperience(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDto,
  ) {
    const createdExperience = await this.experienceService.updateExperience(
      id,
      dto,
    );
    return createdExperience;
  }
}
