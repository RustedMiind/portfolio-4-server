import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/SendEmailDto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-email')
  async sendMail(@Body() body: SendEmailDto) {
    return this.mailerService.saveEmail(body);
  }
}
