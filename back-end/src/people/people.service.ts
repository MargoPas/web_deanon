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

  async create(CreateUserDto: CreatePeopleDto) {
    const people = this.PeopleRepository.create(CreateUserDto);
    console.log(people);
    await this.PeopleRepository.save(people);
  }
  async setPhoto(userId: number, photoUrl: string) {
    try {
      console.log(userId);
      const user = await this.PeopleRepository.findOne({ id: userId });
      console.log(user, 'user');
      await this.PeopleRepository.update({ id: userId }, { Photo: photoUrl });
    } catch (e) {
      return { message: "Can't upload your photo" };
    }
  }
}
