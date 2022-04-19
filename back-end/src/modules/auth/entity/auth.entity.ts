import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ default: 'test_admin@mailinator.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'abcd1234' })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class UserLoginInput extends UserLoginDto {
  constructor({ email, password }) {
    super();
    this.email = email;
    this.password = password;
  }
}

export class UserResetPasswordDto {
  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class UserResetPasswordInput extends UserResetPasswordDto {
  constructor({ password }) {
    super();
    this.password = password;
  }
}
