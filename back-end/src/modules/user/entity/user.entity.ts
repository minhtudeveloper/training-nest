import { UserRole, UserStatus } from '../enum';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IsString, IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
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
  @Column({ enum: [UserRole.ADMIN, UserRole.USER] })
  role: string;

  @IsString()
  @Column({
    enum: [
      UserStatus.ACTIVE,
      UserStatus.DELETED,
      UserStatus.INACTIVE,
      UserStatus.PENDING,
    ],
  })
  status: string;

  @IsString()
  @IsEmpty()
  @Column()
  token: string;

  @IsString()
  @Column()
  @IsEmpty()
  google_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  async b4register() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  @BeforeUpdate()
  async b4update() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async matchesPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}
