import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ENV as env } from '@/config';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entity/mail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mail]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          port: 587,
          auth: {
            user: env().MAIL_USER, // generated ethereal user
            pass: env().MAIL_PASS, // generated ethereal password
          },
        },
        defaults: {
          from: `"No Reply" <${env().MAIL_USER}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [TypeOrmModule.forFeature([Mail]), MailService],
})
export class MailModule {}
