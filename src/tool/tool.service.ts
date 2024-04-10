import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTools() {
    return await this.prismaService.tool.findMany();
  }

  async createNewTool(toolDto: Prisma.ToolCreateInput) {
    const tool = await this.prismaService.tool.create({ data: toolDto });
    return tool;
  }

  async updateToolbyId(toolId: string, toolDto: Prisma.ToolUpdateInput) {
    const tool = await this.prismaService.tool.update({
      data: toolDto,
      where: { id: toolId },
    });
    return tool;
  }

  async deleteTool(toolId: string) {
    try {
      const deletedTool = await this.prismaService.tool.delete({
        where: { id: toolId },
      });
      return deletedTool;
    } catch (error) {
      throw new HttpException(
        "Couldn't delete the selected tool, It might be already deleted.",
        HttpStatus.CONFLICT,
      );
    }
  }
}
