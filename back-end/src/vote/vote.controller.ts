import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import RequestWithUser from '../auth/requestWithUser.interface';
import JwtAuthenticationGuard from '../common/guard/jwt.auth.guard';

@Controller('api/voting')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('/create')
  async create(
    @Body() createVoteDto: CreateVoteDto,
    @Req() request: RequestWithUser,
  ) {
    try {
      const dto = {
        ...createVoteDto,
        stars: 1,
        user_id: request.user.id,
      };
      await this.voteService.create_vote(dto);
      return { message: 'ok' };
    } catch (e) {
      return e;
    }
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get('voted')
  async voted(@Req() request: RequestWithUser) {
    const user = {
      user_id: request.user.id,
    };
    const answer = await this.voteService.user_in_table(user);
    if (answer) {
      return { message: 'voted' };
    } else {
      return { message: 'not voted' };
    }
  }

  @Get('list_with_votes')
  async list() {
    try {
      return await this.voteService.users_with_votes();
    } catch (e) {
      return e;
    }
  }
}
