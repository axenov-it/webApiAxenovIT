import * as nodemailer from "nodemailer";
import { pugEngine } from "nodemailer-pug-engine";

import { getMailerOptions } from "config";

export interface MailInterface {
  html?: string;
  from?: string;
  to?: string;
  subject?: string;
  template?: string;
  ctx?: any;
}

const { transportConfig, fromDomain } = getMailerOptions();

const transporter = nodemailer.createTransport(transportConfig);

transporter.use(
  "compile",
  pugEngine({
    templateDir: __dirname + "/../views/mailer",
  })
);

export const sendMail = async ({
  html,
  from,
  to,
  subject,
  template,
  ctx,
}: MailInterface): Promise<unknown> => {
  try {
    return await transporter.sendMail({
      from: `${fromDomain} <${from}>`,
      to,
      subject,
      text: "",
      html,
      template,
      ctx,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("SENDER ERROR", err);
  }
};
