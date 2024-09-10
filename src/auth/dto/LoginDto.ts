import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class LoginDto extends createZodDto(loginSchema) {}
