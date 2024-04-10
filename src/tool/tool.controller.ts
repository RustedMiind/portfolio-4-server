import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateDto } from './dto/createDto';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';
import { UpdateDto } from './dto/updateDto';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get('')
  async getAllTools() {
    return await this.toolService.getAllTools();
  }

  @Post('')
  @Permission(PermissionName.CREATE_TOOL)
  async createNewTool(@Body(ValidationPipe) body: CreateDto) {
    return await this.toolService.createNewTool(body);
  }

  @Patch(':id')
  @Permission(PermissionName.UPDATE_TOOL)
  async updateExistingTool(
    @Body(ValidationPipe) body: UpdateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.toolService.updateToolbyId(id, body);
  }

  @Delete(':id')
  @Permission(PermissionName.DELETE_TOOL)
  async deleteTool(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.toolService.deleteTool(id);
  }
}
