import { Body, Controller, Get, Post } from '@nestjs/common';
import { renderFile } from 'ejs';
import sendEmail from 'src/functions/sendEmail';
import { join } from 'path';

@Controller('mailer')
export class MailerController {
  @Post('send-email')
  async sendMail(@Body() body: any) {
    const mail = await sendEmail(body.to, body.subject, 'Hello There Mr Ali');
    console.log(mail);
    return { msg: 'successfull' };
  }

  @Get()
  viewTemplate() {
    return new Promise((resolve, reject) => {
      renderFile(
        join(
          __dirname,
          '..',
          '..',
          'assets/html/templates/email/recieved/index.ejs',
        ),
        {
          sender: 'test sender',
          body: 'message body',
          subject: 'hello subject',
        },
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
