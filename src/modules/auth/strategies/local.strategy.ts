import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(userEmail: string, userPass: string) {
    const user = await this.authService.validateUser(userEmail, userPass);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
