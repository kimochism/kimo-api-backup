import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as handleblars from 'nodemailer-express-handlebars';
import * as path from 'path';
import sendgridConfig from "../../config/sendgrid.config";

@Injectable()
export class EmailService {
    constructor() { }

    async sendMail(to: string, subject: string, text: string, template: string, context: any): Promise<any> {

        const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: 'apikey',
                pass: sendgridConfig.api_key,
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
                layoutsDir: 'src/views',
                defaultLayout: 'emailConfirmation'
            },
            extName: '.handlebars',
            viewPath: 'src/views/'
        }));

        const mailData = {
            from: `Kimochism 気持ち <${sendgridConfig.from_email}>`,
            text,
            to,
            subject,
            template,
            context
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
}