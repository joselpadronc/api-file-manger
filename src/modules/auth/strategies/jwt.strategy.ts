import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import config from 'src/shared/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtKey,
    });
  }

  validate(token) {
    return token;
  }
}
