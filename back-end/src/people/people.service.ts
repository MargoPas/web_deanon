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

  async create(CreatePeopleDto: CreatePeopleDto) {
    const people = this.PeopleRepository.create(CreatePeopleDto);
    await this.PeopleRepository.save(people);
  }

  async findAll(FindPeopleDto: FindPeopleDto) {
    return await this.PeopleRepository.find(FindPeopleDto);
  }
}
