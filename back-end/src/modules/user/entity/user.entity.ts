import { UserRole, UserStatus } from '../enum';

import * as bcrypt from 'bcrypt';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
  IsNull,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
// table - Users
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsString()
  @IsEmail()
  @Index({ unique: true })
  email: string;

  @IsString()
  @Column()
  password: string;

  @IsString()
  @Column()
  full_name: string;

  @IsString()
  @Column()
  @IsEnum(UserRole)
  role: string;

  @IsString()
  @Column()
  @IsEnum(UserStatus)
  status: string;

  @Column()
  token: string;

  @Column()
  google_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}

export const bcryptPassword = {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  },
  async matchesPassword(password, candidatePassword) {
    return await bcrypt.compare(password, candidatePassword);
  },
};

export class UserCreateDto {
  @ApiProperty({ default: 'testAd@mailinator.com' })
  @IsString()
  @Column()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'abcd1234' })
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'admin_abcd' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ default: UserRole.ADMIN })
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({ default: UserStatus.ACTIVE })
  status: string;
}

export class UserCreateInput extends UserCreateDto {
  constructor({ email, password, full_name, role, status }: any) {
    super();
    this.email = email;
    this.password = password;
    this.full_name = full_name;
    this.role = role;
    this.status = status;
  }

  @IsEnum(UserStatus)
  status: string;
}

export class UserChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password_old: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password_new: string;
}

export class UserChangePasswordInput extends UserChangePasswordDto {
  constructor({ password_new, password_old }) {
    super();
    this.password_new = password_new;
    this.password_old = password_old;
  }
}

export class UserUpdateDto {
  @ApiProperty({ default: 'abcddef' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  status: string;
}

export class UserUpdateInput extends UserUpdateDto {
  constructor({ full_name, role, status }: any) {
    super();
    this.full_name = full_name;
    this.role = role;
    this.status = status;
  }

  @ApiProperty()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty()
  @IsEnum(UserStatus)
  status: string;
}

export class UserDeleteDto {
  @ApiProperty()
  @IsString()
  userId: string;
}

export class UserDeleteInput {
  constructor({ userId, status }: any) {
    this.id = userId;
    this.status = status;
  }
  @ApiProperty()
  id: ObjectID;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}
