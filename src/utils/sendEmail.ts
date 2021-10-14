import * as nodemailer from 'nodemailer';
import * as handleblars from 'nodemailer-express-handlebars';
import * as path from 'path';

const { SENDGRID_API_KEY } = process.env;

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, link: string) => {
  
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: 'apikey', // generated sendgrid user
      pass: SENDGRID_API_KEY, // generated sendgrid password
    },
  });
  
  transporter.use('compile', handleblars({
    viewEngine: {
      partialsDir: path.join(__dirname, '../../src/views/'),
      layoutsDir: path.join(__dirname, '../../src/views/'),
    },
    viewPath: path.join(__dirname, '../../src/views/')
  }));

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'kimochism.store@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Confirmação de email', // Subject line
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    template: 'main',
    context: {
      link
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}