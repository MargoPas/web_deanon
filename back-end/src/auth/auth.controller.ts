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
import RequestWithUser from './requestWithUser.interface';
import { LoginUserDto } from '../users/dto/login-user-dto';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationDto: CreateUserDto) {
    return this.authService.register(registrationDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginUserDto, @Req() request: RequestWithUser) {
    const user = this.authService.validateUser(loginDto);
    if (user) {
      return user;
    } else {
      return { message: 'oh' };
    }
  }

  @UseGuards(LocalAuthenticationGuard)
  @Get('home')
  async get_in(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
