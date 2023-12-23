import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateDto } from './dto/CreateDto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles() {
    const roles = await this.roleService.getRoles();
    return roles;
  }

  @Post()
  async createRoles(@Body(ValidationPipe) dto: CreateDto) {
    const createdRole = await (dto.permissions
      ? this.roleService.createRoleWithPermissions(dto.name, dto.permissions)
      : this.roleService.createRole(dto.name));
    return createdRole;
  }
}
