import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) {}

  async findAl(): Promise<any> {
    return this.UsersRepository.find();
  }

  async createUser(CreateUserDto: CreateUserDto){
    try {
      const user = await this.UsersRepository.create(CreateUserDto)
      await this.UsersRepository.save(user)
    }
    catch (e) {
      message:'User is not created. Error'
    }
  }

  async findOneByName(name:string): Promise<Users>{
    try{
      return await this.UsersRepository.findOne({name:name})
    }
    catch (e) {
      const data = {
        error: e,
        message: 'No such user'
      }
      message: data
    }
  }
}
