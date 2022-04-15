import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCreateInput } from './entity/user.entity';
import { UserRole, UserStatus } from './enum';
import { validate } from 'class-validator';
import { getLogValidateFaile } from '@/util/validate';

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

  async createUser(input: UserCreateInput): Promise<any> {
    return new Promise(async (rs, rj) => {
      try {
        const { full_name, password, email, role, status } = input;
        const dataCreate = new User();
        dataCreate.email = email;
        dataCreate.password = password;
        dataCreate.full_name = full_name;
        dataCreate.role = role || UserRole.USER;
        dataCreate.status = status || UserStatus.ACTIVE;
        const errors = await validate(new UserCreateInput(dataCreate));
        if (errors.length > 0) {
          rj(getLogValidateFaile(errors));
        } else {
          const data = await this.userRepository.save(dataCreate);
          if (data) {
            rs('Success Create!');
          }
        }
      } catch (error) {
        rj(error);
      }
    });
  }
}
