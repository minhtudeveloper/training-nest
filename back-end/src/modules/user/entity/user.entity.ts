import { UserRole, UserStatus } from '../enum';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  validateOrReject,
  IsEmpty,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
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

@Entity('user')
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

  @BeforeInsert()
  async validate() {
    await validateOrReject(this);
  }
  @BeforeInsert()
  async b4register() {
    console.log('ahihi');

    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async b4update() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }
  @BeforeUpdate()
  async matchesPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
  @BeforeUpdate()
  async validateUpdate() {
    await validateOrReject(this);
  }
}

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  @Column()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty()
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
