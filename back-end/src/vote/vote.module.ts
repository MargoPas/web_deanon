import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { votes } from './entities/voting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([votes])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
