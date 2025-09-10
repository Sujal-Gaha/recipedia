import { INotifyService } from '@baijanstack/express-auth';
import { env, logger } from '@libs/quasar';
import nodemailer, { Transporter } from 'nodemailer';
import { EmailPayload } from './types';
import { Templates } from './templates';

export class EmailNotificationService implements INotifyService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  private async sendMail(payload: EmailPayload): Promise<void> {
    const mailOptions = {
      from: env.MAIL_USER,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`✅ Email sent: ${info.messageId}`);
    } catch (error) {
      logger.error(`❌ Error sending email: ${error}`);
    }
  }

  public sendOtp = async (email: string, { code }: { code: string }): Promise<void> => {
    await this.sendMail({
      html: Templates.OTP({ code }),
      subject: 'OTP',
      to: email,
    });

    logger.info({ code }, `Notifying | OTP | Email: ${email}`);
  };

  public notifyEmailVerified = async (email: string): Promise<void> => {
    await this.sendMail({
      html: Templates.EMAIL_VERIFIED({ email }),
      subject: 'Email Verified',
      to: email,
    });

    logger.info(`Notifying | EMAIL_VERIFIED | Email: ${email}`);
  };

  // !BACKLOG_FEATURE
  public sendTokenStolen = async (email: string): Promise<void> => {
    logger.info(`Notifying | TOKEN_STOLEN | Email: ${email}`);
  };
}
