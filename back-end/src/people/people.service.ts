import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { FindPeopleDto } from './dto/find-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly PeopleRepository: Repository<People>,
  ) {}

  async create(CreatePeopleDto: CreatePeopleDto, user_id, photo_url) {
    console.log(photo_url);
    const peopledto = {
      ...CreatePeopleDto,
      user_id: user_id,
      Photo: photo_url,
    };
    console.log(peopledto);
    const people = this.PeopleRepository.create(peopledto);

    await this.PeopleRepository.save(people);
  }

  async findAll(FindPeopleDto: FindPeopleDto) {
    return await this.PeopleRepository.find(FindPeopleDto);
  }
}
