import { IsString, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
