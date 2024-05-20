import nodeMailer from 'nodemailer';

async function sendEmail(
  userEmail: string,
  subject: string,
  htmlTemplate: string,
) {
  const SENDER_EMAIL = process.env.APP_EMAIL_ADDRESS as string;
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mail = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    });
    console.log('Mail Sent Successfully', mail.response);
  } catch (error) {
    console.log(error);
    throw new Error('Internal Server Error (nodemailer)');
  }
}

export default sendEmail;
