import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getRole(roleId: string) {
    try {
      const role = await this.prisma.role.findUnique({ where: { id: roleId } });
      return role;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getRoles() {
    try {
      const roles = await this.prisma.role.findMany();
      return roles;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createRoleWithPermissions(name: string, permissions: string[]) {
    const rolesWithPermissions = permissions.map((permissionId) => ({
      id: permissionId,
    }));

    try {
      const createdRole = await this.prisma.role.create({
        data: {
          name,
          permissions: {
            connect: rolesWithPermissions,
          },
        },
        include: { permissions: true },
      });
      return createdRole;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createRole(name: string) {
    try {
      const createdRole = await this.prisma.role.create({
        data: {
          name,
        },
      });
      return createdRole;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async assignRole(userId: string, roleId: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { role: { connect: { id: roleId } } },
      });
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
