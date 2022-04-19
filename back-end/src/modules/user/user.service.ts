import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  UserChangePasswordDto,
  UserCreateDto,
  UserCreateInput,
  bcryptPassword,
  UserUpdateDto,
  UserUpdateInput,
  UserDeleteDto,
  UserDeleteInput,
  UserChangePasswordInput,
} from './entity/user.entity';
import { UserRole, UserStatus } from './enum';
import { validate } from 'class-validator';
import { getLogValidateFaile } from '@/util/validate';
import { Response, Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const data = await this.userRepository.find();
        if (data) {
          rs(data);
        }
      } catch (error) {
        rj(error);
      }
    });
  }

  async changePassword(
    req: Request,
    input: UserChangePasswordDto,
  ): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const userClient: any = req.user;
        const { password_new, password_old } = input;
        const data = { password_new, password_old };
        const errors = await validate(new UserChangePasswordInput(data));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        }

        const user: any = await this.userRepository.findOne(userClient.id);
        if (
          user &&
          bcryptPassword.matchesPassword(password_old, user.password)
        ) {
          await this.userRepository.update(user.id, {
            password: await bcryptPassword.hashPassword(password_new),
          });
          rs('success update!');
        } else {
        }
      } catch (error) {
        rj(error);
      }
    });
  }

  async updateUser(req: Request, input: UserUpdateDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const userClient: any = req.user;
        const { full_name, role, status } = input;
        const data = {
          full_name,
          role: role || userClient.role,
          status: status || userClient.status,
        };
        const errors = await validate(new UserUpdateInput(data));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        } else {
          await this.userRepository.update(userClient.id, {
            ...data,
          });
          rs('success update!');
        }
      } catch (error) {
        rj(error);
      }
    });
  }

  async deleteUser(input: UserDeleteDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const { userId } = input;
        const data = {
          id: userId,
          status: UserStatus.DELETED,
        };
        const errors = await validate(new UserDeleteInput(data));
        if (errors.length > 0) {
          rj(errors);
          rj(getLogValidateFaile(errors));
        } else {
          await this.userRepository.update(data.id, {
            ...data,
          });
          rs('success update!');
        }
      } catch (error) {}
    });
  }

  async createUser(input: UserCreateDto): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const { full_name, password, email, role, status } = input;
        const data = { full_name, password, email, role, status };
        const errors = await validate(new UserCreateInput(data));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        } else {
          data.password = await bcryptPassword.hashPassword(data.password);
          const result = await this.userRepository.save(data);
          if (result) {
            rs('Success Create!');
          }
        }
      } catch (error) {
        rj(error);
      }
    });
  }
}
