import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Mark the module as global
@Module({
  providers: [PrismaService], // Include PrismaService in the providers array
  exports: [PrismaService], // Export PrismaService to be used in other modules
})
export class PrismaModule {}
