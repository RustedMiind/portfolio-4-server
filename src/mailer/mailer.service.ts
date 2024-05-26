import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import sendEmail from 'src/functions/sendEmail';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailerService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveEmail(data: MailT) {
    const mail = await this.prismaService.mails.create({
      data: data,
    });
    const html = await this.renderTemplate({
      body: mail.body,
      sender: mail.sender_name,
      subject: mail.subject,
    });
    await sendEmail(mail.sender_email, mail.subject, html);
    return mail;
  }

  private renderTemplate(data: RenderTemplateT) {
    return new Promise<string>((resolve, reject) => {
      renderFile(
        join(
          __dirname,
          '..',
          '..',
          'assets/html/templates/email/recieved/index.ejs',
        ),
        data,
        {},
        function (err, str) {
          if (err) reject(err);
          // str => Rendered HTML string
          console.log(str);
          resolve(str);
        },
      );
    });
  }
}

type RenderTemplateT = {
  sender: string;
  subject: string;
  body: string;
};

export interface MailT {
  body: string;
  subject: string;
  sender_email: string;
  sender_name: string;
  org_name?: string;
}
