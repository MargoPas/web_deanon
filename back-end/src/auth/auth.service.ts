import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './tokenPayload.interface';

const MESSAGE_BAD = { message: 'User is not created. Error' };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.authenticateUser(LoginUserDto);
    console.log(user, '111');
    return user;
  }

  async register(registrationDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    registrationDto.password = hashedPassword;
    try {
      const createdUser = await this.usersService.createUser(registrationDto);
      console.log(createdUser);
      if (createdUser) {
        console.log('succeeded');
        return registrationDto;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getAuthenticatedUser(login: string, hashedPassword: string) {
    try {
      const user = await this.usersService.findOneByLogin(login);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCookieWithJwtToken(login: string) {
    const user = await this.usersService.findOneByLogin(login);
    console.log('Found user: ',user, '(getCookie func)');
    const userId = user.id;
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    console.log(token);
    return `Authentication=${token}; HttpOnly; Path=/authentication; Max-Age=${3600}`;
  }
}
