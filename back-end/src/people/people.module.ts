import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleService } from './people.service';
import { People } from './entities/people.entity';
import { PeopleController } from './people.controller';
import {FileService} from "../file/file.service";

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [PeopleController],
  providers: [PeopleService, FileService],
})
export class PeopleModule {}
