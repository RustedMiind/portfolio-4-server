import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const CreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  permissions: z.array(z.string().uuid()).optional(),
});

export class CreateDto extends createZodDto(CreateSchema) {}
