import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthenticationGuard } from '../common/guard/authenticaited.guard';
import { LoginUserDto } from '../users/dto/login-user-dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from '../common/guard/jwt.auth.guard';
import { Response } from 'express';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationDto: CreateUserDto) {
    return this.authService.register(registrationDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(loginDto);
    console.log(user, 'aaa');
    if (user != undefined) {
      const login = user.login;
      console.log(user);
      const cookie = await this.authService.getCookieWithJwtToken(login);
      response.setHeader('Set-Cookie', cookie);
      console.log('aaa');
      return user;
    } else {
      console.log('vvv');
      return { message: 'oh' };
    }
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    console.log(user);
    user.password = undefined;
    console.log(user);
    return user;
  }
}
