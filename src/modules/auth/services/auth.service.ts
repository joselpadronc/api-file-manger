import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPass: string) {
    const user = await this.userService.findByEmail(userEmail);
    const passwordIsCorrect = await bcrypt.compare(userPass, user.password);

    if (user && passwordIsCorrect) {
      delete user.password;
      return user;
    }
    return null;
  }

  async genereteJwt(userData) {
    userData.accessToken = this.jwtService.sign({ ...userData });
    return userData;
  }
}
