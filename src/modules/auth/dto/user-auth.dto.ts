import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
