import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { People } from '../../people/entities/people.entity';
import {Users} from "../../users/entities/users.entity";

export class CreateVoteDto {

  @ApiProperty()
  @IsNotEmpty()
  people_id: People;

}
