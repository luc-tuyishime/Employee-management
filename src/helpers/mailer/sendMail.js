import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';

import * as template from './templates';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);

  const message = {
    to,
    from: 'luctunechi45@gmail.com',
    subject: 'Management Employee',
    text: 'Management Employee',
    html: `<div style="background:#e5eeff;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff">
          <div style="background:##9e9e9e;padding:20px;color:#ffffff;text-align:left;font-size:34px">
           <p style="margin-left: 18px;padding-top: 19px;">Management - Employees</p>
          </div>
          <div style="padding:20px;text-align:left;">
          ${notifier.html}
          </div>
          <br>

          <div style="padding:20px;text-align:left;">
          <b>The NINJA Company</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, 2020<br>
            Management Employees
          </div>
          </div>`
  };
  return NODE_ENV === 'test' ? true : mailer.send(message);
};
