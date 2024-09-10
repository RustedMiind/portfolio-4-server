import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { isStrongPassword } from 'validator';

const CreateUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, 'Email is required'),
  firstName: z.string(),
  lastName: z.string(),
  hash: z.string().refine((val) =>
    isStrongPassword(val, {
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 0,
    }),
  ),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
