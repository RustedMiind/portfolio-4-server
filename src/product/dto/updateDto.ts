import { createZodDto } from 'nestjs-zod';
import { CreateSchema } from './createDto';

export class UpdateDto extends createZodDto(CreateSchema.partial()) {}
