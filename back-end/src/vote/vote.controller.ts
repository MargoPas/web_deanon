import { Body, Controller, Post } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('api/voting')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('/create')
  async create(@Body() createVoteDto: CreateVoteDto) {
    try {
      await this.voteService.create_vote(createVoteDto);
      return { message: 'ok' };
    } catch (e) {
      return e;
    }
  }
}
