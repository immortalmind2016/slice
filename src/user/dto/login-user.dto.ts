import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(10)
  password: string;

  @IsEmail()
  email: string;
}
