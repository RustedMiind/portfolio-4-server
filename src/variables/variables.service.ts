import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VariablesService {
  constructor(private readonly prisma: PrismaService) {}

  async setVariable(key: string, value: string) {
    try {
      const updated = this.prisma.keyValue.update({
        where: { key },
        data: { value },
      });
      return updated;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getVariable(key: string) {
    try {
      const value = this.prisma.keyValue.findUnique({
        where: { key },
      });
      return value;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getAllVariable() {
    try {
      const values = this.prisma.keyValue.findMany();
      return values;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
