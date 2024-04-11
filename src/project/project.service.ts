import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@prisma/client';
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
        include: this.defaultInclude,
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
        { include: this.defaultInclude },
      );
      return projects;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProjects() {
    return await this.prismaService.project.findMany({
      include: this.defaultInclude,
    });
  }

  async createProject(project: Project, tools?: string[]) {
    try {
      const createdProduct = this.prismaService.project.create({
        data: {
          ...project,
          tools: { connect: tools?.map((tool) => ({ id: tool })) },
        },
        include: this.defaultInclude,
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProject(
    projectId: string,
    project: Partial<Project>,
    tools?: string[],
  ) {
    try {
      const createdProduct = this.prismaService.project.update({
        data: {
          ...project,
          tools: { connect: tools?.map((tool) => ({ id: tool })) },
        },
        include: this.defaultInclude,
        where: { id: projectId },
      });
      return createdProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteProject(id: string) {
    try {
      const deletedProject = await this.prismaService.project.delete({
        where: { id },
      });
      return deletedProject;
    } catch (error) {
      throw new HttpException(
        "Couldn't delete the selected tool, It might be already deleted.",
        HttpStatus.CONFLICT,
      );
    }
  }

  private readonly defaultInclude = { experience: true, tools: true };
}
