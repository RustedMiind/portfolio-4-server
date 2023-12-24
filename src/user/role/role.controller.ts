import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateDto } from './dto/CreateDto';
import { AssignDto } from './dto/AssignDto';
import { Permission } from '../permission/permission.decorator';
import { PermissionName } from '../permission/permission.enum';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles() {
    const roles = await this.roleService.getRoles();
    return roles;
  }

  @Permission(PermissionName.MANAGE_ROLE)
  @Post()
  async createRoles(@Body(ValidationPipe) dto: CreateDto) {
    const createdRole = await (dto.permissions
      ? this.roleService.createRoleWithPermissions(dto.name, dto.permissions)
      : this.roleService.createRole(dto.name));
    return createdRole;
  }

  @Permission(PermissionName.ASSIGN_ROLE)
  @Post('assign')
  async assignRole(@Body(ValidationPipe) dto: AssignDto) {
    const assignedUser = await this.roleService.assignRole(
      dto.userId,
      dto.roleId,
    );
    return assignedUser;
  }
}
