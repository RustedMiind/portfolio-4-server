import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MailT } from '../mailer.service';

export class SendEmailDto implements MailT {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  sender_email: string;

  @IsString()
  @IsNotEmpty()
  sender_name: string;

  @IsString()
  @IsOptional()
  org_name?: string;
}
