import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Experience, Prisma } from '@prisma/client';
import { paginate } from 'paginate-prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationOptions } from 'src/types';

@Injectable()
export class ExperienceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getExperienceById(id: string): Promise<Experience> {
    try {
      const experience = await this.prismaService.experience.findUniqueOrThrow({
        where: { id },
      });
      return experience;
    } catch (error) {
      throw new NotFoundException(
        'Product you are looking for does not exist, or it might be deleted.',
      );
    }
  }

  async getExperiences({ page }: PaginationOptions) {
    try {
      const experiences = await paginate(this.prismaService.experience)(
        {},
        {
          page,
        },
        {},
      );
      return experiences;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllExperiences() {
    return await this.prismaService.experience.findMany();
  }

  async createExperience(experience: Prisma.ExperienceCreateInput) {
    try {
      const createdExperience = this.prismaService.experience.create({
        data: experience,
      });
      return createdExperience;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateExperience(
    experienceId: string,
    experience: Partial<Prisma.ExperienceCreateInput>,
  ) {
    try {
      const createdExperience = this.prismaService.experience.update({
        data: experience,
        where: { id: experienceId },
      });
      return createdExperience;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}