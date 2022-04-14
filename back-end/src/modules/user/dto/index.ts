import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Your email can not be blank.' })
  id: string;

  @IsEmail({ message: 'Invalid email message' })
  @IsNotEmpty({ message: 'Your email can not be blank.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Your full name can not be blank.' })
  full_name: string;

  @MinLength(8, {
    message: 'Your password must be more than 8 character.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Your password can not be blank.' })
  password: string;

  @IsString()
  @IsEmpty()
  role: string;

  @IsString()
  @IsEmpty()
  status: string;
}
