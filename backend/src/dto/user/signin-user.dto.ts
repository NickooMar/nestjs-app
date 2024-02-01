import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
