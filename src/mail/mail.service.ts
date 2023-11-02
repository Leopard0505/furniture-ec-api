import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailOptions } from './interface/send-mail-options.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(sendMailOptions: SendMailOptions) {
    await this.mailerService.sendMail({
      ...sendMailOptions,
    });
  }

  async sendMailForOrderCreated(to: string, context) {
    await this.mailerService.sendMail({
      to,
      subject: 'ご注文を確認しました',
      template: './order-complete',
      context,
    });
  }
}
