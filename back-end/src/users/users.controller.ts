import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {Users} from "./entities/users.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async getAllUsers(){
    return this.UsersService.findAl()
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.UsersService.createUser(createUserDto)
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Users>{
    return await this.UsersService.findOneByName(name)
  }
}
export class UserModule {}