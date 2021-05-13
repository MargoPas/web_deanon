import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
