import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Variables } from '../variables.enum';

const SetVariableSchema = z.object({
  key: z.nativeEnum(Variables, {
    errorMap: () => ({ message: 'Invalid enum value for key' }),
  }),
  value: z.string(),
});

export class SetVariableDto extends createZodDto(SetVariableSchema) {}
