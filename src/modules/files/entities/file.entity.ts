import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'The typeFile field is required' })
  typeFile: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'The urlFile field is required' })
  urlFile: string;

  @Column({ type: 'integer' })
  @IsNotEmpty({ message: 'The userId field is required' })
  userId: number;
}
