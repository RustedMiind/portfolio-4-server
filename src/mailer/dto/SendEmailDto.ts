import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { MailT } from '../mailer.service';

const SendEmailSchema = z.object({
  subject: z.string(),
  body: z.string(),
  sender_email: z.string().email(),
  sender_name: z.string(),
  org_name: z.string().optional(),
});

export class SendEmailDto
  extends createZodDto(SendEmailSchema)
  implements MailT {}

// Now `SendEmailDto` can be used in NestJS with zod validation.
