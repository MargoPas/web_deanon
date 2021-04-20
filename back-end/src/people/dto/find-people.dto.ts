import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindPeopleDto {
    @ApiProperty()
    @IsNotEmpty()
    Last_Name: string;

    @ApiProperty()
    @IsNotEmpty()
    First_Name: string;

    @ApiProperty()
    Middle_Name: string;

}
