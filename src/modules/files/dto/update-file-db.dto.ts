import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDbDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
