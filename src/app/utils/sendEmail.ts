import path from 'path';
import ejs from 'ejs';
import nodemail from 'nodemailer';
import config from '../../config';
import { ISendEmailOptions } from '../interface/email.interface';

const transporter = nodemail.createTransport({
  service: config.smtp.service || 'smtp',
  host: config.smtp.host,
  port: config.smtp.port,
  secure: true,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
} as any);

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: ISendEmailOptions) => {
  try {
    const template = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(template, templateData);
    await transporter.sendMail({
      from: config.smtp.user,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log(error);
  }
};