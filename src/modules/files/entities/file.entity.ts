import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  @IsNotEmpty({ message: 'The userId field is required' })
  userId: string;

  @Column({ name: 'url_file', type: 'varchar' })
  @IsNotEmpty({ message: 'The urlFile field is required' })
  urlFile: string;
}
