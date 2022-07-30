import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    try {
      return await this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `User with email: ${userData.email}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['email', 'fullName', 'id'],
    });
    return users;
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }
    delete user.password;
    return user;
  }

  async findByEmail(userEmail: string) {
    const user = await this.userRepository.findOneBy({ email: userEmail });
    if (!user) {
      throw new NotFoundException(`User with email: ${userEmail} not found`);
    }
    delete user.password;
    return user;
  }

  async update(userId: number, userData: UpdateUserDto) {
    const user = await this.findOne(userId);

    const userUpadated = this.userRepository.merge(user, userData);
    delete userUpadated.password;

    return userUpadated;
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);

    const userDeleted = this.userRepository.delete(user.id);

    return userDeleted;
  }
}
