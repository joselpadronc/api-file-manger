import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFileS3Dto {
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  buffer: string;
}
