import * as nodemailer from 'nodemailer';
import * as handleblars from 'nodemailer-express-handlebars';
import * as path from 'path';

const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

export const sendEmail = async (email: string, link: string, name: string) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD,
    },
    secure: true
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  transporter.use('compile', handleblars({
    viewEngine: {
      partialsDir: path.join(__dirname, '../../src/views/'),
      layoutsDir: path.join(__dirname, '../../src/views/'),
    },
    viewPath: path.join(__dirname, '../../src/views/')
  }));

  const mailData = {
    from: GMAIL_EMAIL,
    text: 'Kimochism 気持ち',
    to: email,
    subject: 'Confirmação de email',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    template: 'main',
    context: {
      link,
      name,
    }
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("Message sent: %s", info.messageId);
        resolve(info);
      }
    });
  });


}