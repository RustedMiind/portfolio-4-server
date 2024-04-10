import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VariablesService {
  constructor(private readonly prisma: PrismaService) {}
}
