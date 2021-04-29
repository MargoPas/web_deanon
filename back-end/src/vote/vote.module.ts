import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { votes } from './entities/voting.entity';
import {People} from "../people/entities/people.entity";
import {Users} from "../users/entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([votes, People, Users])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
