import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptPassword, User } from '@/modules/user/entity/user.entity';
import {
  AuthForgotPasswordDto,
  AuthForgotPasswordInput,
  AuthLoginDto,
  AuthResetPasswordDto,
  AuthResetPasswordInput,
} from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { validate } from 'class-validator';
import { getLogValidateFaile } from '@/util/validate';
import { MailService } from '../mail/mail.service';

Injectable();
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailservice: MailService,
  ) {}

  async login(input: AuthLoginDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      const { email, password } = input;
      const user: any = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (
        user &&
        (await bcryptPassword.matchesPassword(password, user.password))
      ) {
        const tokenToClient = await this.jwtService.sign({
          id: user.id.toString(),
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          status: user.status,
        });
        await this.userRepository.update(
          {
            email: user.email,
          },
          {
            token: tokenToClient,
          },
        );
        rs(tokenToClient);
      } else {
        rj('User & Password is wrong!');
      }
    });
  }

  async resetPassword(req: Request, input: AuthResetPasswordDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const userClient: any = req.user;
        const { password } = input;
        const data = { password };
        const errors = await validate(new AuthResetPasswordInput(data));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        }
        await this.userRepository.update(userClient.id, {
          password: await bcryptPassword.hashPassword(data.password),
        });
        rs('Success change!');
      } catch (error) {
        rj(error);
      }
    });
  }

  async forgotPassword(input: AuthForgotPasswordDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        // mailservice
        console.log({ input });
        const { email } = input;
        const data = { email };
        const errors = await validate(new AuthForgotPasswordInput(data));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        }
        const user = await this.userRepository.findOne({
          where: {
            email: data.email,
          },
        });
        const tokenToClient = await this.jwtService.sign({
          id: user.id.toString(),
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          status: user.status,
        });

        this.mailservice.sendUserConfirmation(user, tokenToClient).then(() => {
          rs('Success send Mail!');
        });
      } catch (error) {
        rj(error);
      }
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (
      user &&
      (await bcryptPassword.matchesPassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }
}
