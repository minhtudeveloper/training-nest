import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    console.log('path : ', join(__dirname, 'templates'));

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Brooo! Do you want to recover your password or get Hassagiiiii',
      template: './confirmation', // `.hbs` extension is appended automatically
      // context: {
      //   // ✏️ filling curly brackets with content
      //   name: user.full_name,
      //   url,
      // },
      html: 'html' + token,
    });
  }
}
