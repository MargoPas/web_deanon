import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(LoginUserDto: LoginUserDto): Promise<any> {
    return await this.usersService.authenticateUser(LoginUserDto);
  }

  async register(registrationDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    registrationDto.password = hashedPassword;
    try {
      const createdUser = await this.usersService.createUser(registrationDto);
      return createdUser;
    } catch (error) {
      if (error?.code === PG_UNIQUE_VIOLATION) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
}
