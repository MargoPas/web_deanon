import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.UsersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.createUser(createUserDto);
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Users> {
    return await this.UsersService.findOneByName(name);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return await this.UsersService.updatePassword(id, updateUserPasswordDto);
  }
}
export class UserModule {}
