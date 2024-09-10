import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const PaginationQueriesSchema = z.object({
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional(),
});

export class CredentialsDto extends createZodDto(PaginationQueriesSchema) {}
