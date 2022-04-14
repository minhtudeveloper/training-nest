import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entity/user.entity';
import { UserRole, UserStatus } from './enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: CreateUserDto): Promise<any> {
    console.log('ahihhihi');
    const { full_name, password, email, role, status } = input;
    const message = 'Email has already been taken.';

    const existedUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existedUser) {
      throw new Error(message);
    }

    const user = new User();
    user.email = email;
    user.password = password;
    user.full_name = full_name;
    user.role = role || UserRole.USER;
    user.status = status || UserStatus.ACTIVE;

    console.log({ user });

    return await this.userRepository.save(user);
  }
}
