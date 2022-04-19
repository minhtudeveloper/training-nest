import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
