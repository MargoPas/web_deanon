import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import {People} from "../people/entities/people.entity";
import {votes} from "../vote/entities/voting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, People, votes])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
