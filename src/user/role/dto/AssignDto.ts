import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const AssignSchema = z.object({
  roleId: z.string().uuid(),
  userId: z.string().uuid(),
});

export class AssignDto extends createZodDto(AssignSchema) {}
