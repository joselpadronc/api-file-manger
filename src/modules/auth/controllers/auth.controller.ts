import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
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
    console.log(request);
    return this.authService.genereteJwt(request.user);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body) {
    return this.authService.genereteJwt(body);
  }
}
