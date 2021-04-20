import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { votes } from './entities/voting.entity';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(votes)
    private readonly VotesRepository: Repository<votes>,
  ) {}

  async create_vote(createVoteDto: CreateVoteDto) {
    try {
      console.log(createVoteDto)
      const vote = await this.VotesRepository.create(createVoteDto);
      console.log(vote);
      await this.VotesRepository.save(vote);
    } catch (e) {
      return e;
    }
  }
}
