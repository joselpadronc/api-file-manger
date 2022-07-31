import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'The fullName field is required' })
  fullName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty({ message: 'The email field is required' })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'The password field is required' })
  @Exclude()
  password: string;
}
