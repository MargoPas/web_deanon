import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePeopleDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
