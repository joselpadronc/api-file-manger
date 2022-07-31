import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@ApiTags()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return this.authService.genereteJwt(request.user);
  }
}
