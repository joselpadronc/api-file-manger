import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserAuthDto } from '../dto/user-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(userData: UserAuthDto) {
    const user = await this.authService.validateUser(
      userData.email,
      userData.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
