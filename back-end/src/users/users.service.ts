import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dto/login-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<any> {
    return this.UsersRepository.find();
  }

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const user = await this.UsersRepository.create(CreateUserDto);
      user.password = await bcrypt.hash(user.password, 10);
      await this.UsersRepository.save(user);
    } catch (e) {
      return { message: 'User is not created. Error' };
    }
  }
  async findOneByName(name: string): Promise<Users> {
    return await this.UsersRepository.findOne({ name: name });
  }

  async findOneByLogin(login: string): Promise<Users> {
    return await this.UsersRepository.findOne({ login: login });
  }

  async updatePassword(id, UpdateUserPasswordDto: UpdateUserPasswordDto) {
    try {
      return await this.UsersRepository.update(
        { id: id },
        UpdateUserPasswordDto,
      );
    } catch (e) {
      return { message: 'oh' };
    }
  }

  async authenticateUser(loginDto: LoginUserDto): Promise<any> {
    console.log(loginDto.login);
    const u = await this.findOneByLogin(loginDto.login);
    console.log(u);
    if (u) {
      const passHash = await bcrypt.hash(loginDto.password, 10);

      if (passHash === u.password) {
        delete u.password;
        return u;
      }
    } else {
      return { message: 'govno tupo' };
    }
  }
}
