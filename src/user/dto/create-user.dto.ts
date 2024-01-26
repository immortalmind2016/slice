import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @MinLength(10)
  password: string;
}
