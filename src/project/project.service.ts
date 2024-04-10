import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { paginate } from 'paginate-prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationOptions } from 'src/types';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProjectById(id: string): Promise<Project> {
    try {
      const project = await this.prismaService.project.findUniqueOrThrow({
        where: { id },
      });
      return project;
    } catch (error) {
      throw new NotFoundException(
        'Product you are looking for does not exist, or it might be deleted.',
      );
    }
  }

  async getProjects({ page }: PaginationOptions) {
    try {
      const projects = await paginate(this.prismaService.project)(
        {},
        {
          page,
        },
        {},
      );
      return projects;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProjects() {
    return await this.prismaService.project.findMany();
  }

  async createProject(project: Prisma.ProjectCreateInput) {
    try {
      const createdProduct = this.prismaService.project.create({
        data: project,
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProject(
    projectId: string,
    project: Partial<Prisma.ProjectCreateInput>,
  ) {
    try {
      const createdProduct = this.prismaService.project.update({
        data: project,
        where: { id: projectId },
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
