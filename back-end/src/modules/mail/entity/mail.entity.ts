import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('mails')
// table - mails
export class Mail {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  to: string | string[];

  @IsString()
  @Column()
  subject: string;

  @IsString()
  @Column()
  content: string;

  @IsString()
  created_by: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}

export class SendMailDto {
  @ApiProperty({ default: ['a@mailinator.com', 'b@mailinator.com'] })
  @IsNotEmpty()
  @Column()
  to: string[];

  @ApiProperty()
  @IsString()
  @Column()
  subject: string;

  @ApiProperty()
  @IsString()
  @Column()
  content: string;
}

export class SendMainInput extends SendMailDto {
  constructor({ to, subject, content, created_by }) {
    super();
    this.to = to;
    this.subject = subject;
    this.content = content;
    this.created_by = created_by;
  }

  @IsString()
  @Column()
  created_by: string;
}
