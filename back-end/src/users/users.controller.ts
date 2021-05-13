import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import RequestWithUser from '../auth/requestWithUser.interface';

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

  @Get('admin')
  async is_admin(@Req() request: RequestWithUser) {
    console.log(request.user);
   /* try {
      console.log('here');
      if (await this.UsersService.is_admin(request.user)) {
        console.log('admin');
        return { message: 'admin' };
      } else {
        console.log('no');
        return { message: 'not admin' };
      }
    } catch (e) {
      console.log(e);
      return e;
    }*/
  }
}
export class UserModule {}
