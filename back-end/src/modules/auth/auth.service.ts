import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptPassword, User } from '@/modules/user/entity/user.entity';
import {
  UserLoginDto,
  UserResetPasswordDto,
  UserResetPasswordInput,
} from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { validate } from 'class-validator';
import { getLogValidateFaile } from '@/util/validate';

Injectable();
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(input: UserLoginDto): Promise<any> {
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

  async resetPassword(req: Request, input: UserResetPasswordDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      const userClient: any = req.user;
      const { password } = input;
      const data = { password };
      const errors = await validate(new UserResetPasswordInput(data));
      if (errors.length > 0) {
        rj(getLogValidateFaile(errors));
      }
      await this.userRepository.update(userClient.id, {
        password: await bcryptPassword.hashPassword(data.password),
      });
      rs('Success change!');
      try {
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
