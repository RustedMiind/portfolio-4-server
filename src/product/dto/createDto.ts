import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative(),
  priceAfterDiscount: z.number().optional(),
});

export class CreateDto extends createZodDto(CreateSchema) {}
