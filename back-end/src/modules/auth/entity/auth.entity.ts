import { UserRole, UserStatus } from '@/modules/user/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ default: 'testAd@mailinator.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'abcd1234' })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class AuthLoginInput extends AuthLoginDto {
  constructor({ email, password }) {
    super();
    this.email = email;
    this.password = password;
  }
}

export class AuthResetPasswordDto {
  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class AuthResetPasswordInput extends AuthResetPasswordDto {
  constructor({ password }) {
    super();
    this.password = password;
  }
}

export class AuthForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AuthForgotPasswordInput extends AuthForgotPasswordDto {
  constructor({ email }) {
    super();
    this.email = email;
  }
}

export class AuthGoogleLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  full_name: string;

  @IsString()
  @IsEnum(UserRole)
  role: string;

  @IsString()
  @IsEnum(UserStatus)
  status: string;

  @IsString()
  token?: string;

  @IsString()
  google_id: string;
}

export class AuthGoogleLoginInput extends AuthGoogleLoginDto {
  constructor({ email, full_name, role, status, google_id }) {
    super();
    this.email = email;
    this.full_name = full_name;
    this.role = role;
    this.status = status;
    this.google_id = google_id;
  }
}
