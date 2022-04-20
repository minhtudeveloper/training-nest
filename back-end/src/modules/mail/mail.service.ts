import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { Mail, SendMailDto, SendMainInput } from './entity/mail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
import { validate } from 'class-validator';
import { getLogValidateFaile } from '@/util/validate';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
  ) {}

  async sendForgotPassword(user: User, token: string) {
    return new Promise(async (rs, rj) => {
      const url = `example.com/auth/confirm?token=${token}`;
      await this.mailerService
        .sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject:
            'Brooo! Do you want to recover your password or get Hassagiiiii',
          // template: './confirmation', // `.hbs` extension is appended automatically
          // context: {
          //   // ✏️ filling curly brackets with content
          //   name: user.full_name,
          //   url,
          // },
          html: ` <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">Forgot password</h4>
            <a href="${url}">${url}</a>
        </div>`,
        })
        .then((result) => rs(result))
        .catch((error) => rj(error));
    });
  }

  async sendMailToUser(req: Request, input: SendMailDto) {
    return new Promise(async (rs, rj) => {
      const userClient: any = req.user;
      const { to, subject, content } = input;
      const data = { to, subject, content, created_by: userClient.id };
      const errors = await validate(new SendMainInput(data));
      if (errors.length > 0) {
        rj(getLogValidateFaile(errors));
      }
      await this.mailRepository.save(data);
      await this.mailerService
        .sendMail({
          to,
          subject: subject || 'Notification',
          html: ` <div style="padding: 10px; background-color: white;">
          <h4 style="color: #0085ff">${subject}</h4>
          ${content}
          </div>`,
        })
        .then((result) => rs(result))
        .catch((error) => rj(error));
    });
  }
}
