import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly PeopleRepository: Repository<People>,
  ) {}

  async create(CreateUserDto: CreatePeopleDto, photoUrl: string) {
    const people = this.PeopleRepository.create(CreateUserDto);
    people.Photo = photoUrl;
    await this.PeopleRepository.save(people);
  }

  async setPhoto(userId: number, photoUrl: string) {
    try {
      const user = await this.PeopleRepository.findOne({ id: userId });
      await this.PeopleRepository.update({ id: userId }, { Photo: photoUrl });
    } catch (e) {
      return { message: "Can't upload your photo" };
    }
  }
}
