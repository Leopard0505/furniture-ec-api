import { ISendMailOptions } from '@nestjs-modules/mailer';

export interface SendMailOptions extends ISendMailOptions {
  to: string;
  subject: string;
  template: string;
  context: {
    [name: string]: any;
  };
}
