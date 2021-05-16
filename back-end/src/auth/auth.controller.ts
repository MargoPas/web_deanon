import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthenticationGuard } from '../common/guard/authenticaited.guard';
import { LoginUserDto } from '../users/dto/login-user-dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from '../common/guard/jwt.auth.guard';
import { Response } from 'express';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registrationDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const answer = await this.authService.register(registrationDto);
    if (answer != undefined && answer != false) {
      const cookie = await this.authService.getCookieWithJwtToken(
        registrationDto.login,
      );
      response.setHeader('Set-Cookie', cookie);
      return { message: 'success', data: answer };
    } else {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(loginDto);
    if (user != undefined) {
      const login = user.login;
      const cookie = await this.authService.getCookieWithJwtToken(login);
      response.setHeader('Set-Cookie', cookie);
      return { message: 'success', data: user };
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('cookie')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    console.log(user);
    return user;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
