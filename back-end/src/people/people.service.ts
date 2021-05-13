import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { FindPeopleDto } from './dto/find-people.dto';
import { FileService } from '../file/file.service';
import { Users } from '../users/entities/users.entity';
import { DeletePeopleDto } from './dto/delete-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly PeopleRepository: Repository<People>,
  ) {}

  async create(CreatePeopleDto: CreatePeopleDto, user_id, file) {
    let photo_url;
    if (file != undefined) {
      photo_url = await FileService.createFile(file);
    } else {
      photo_url = 'unknown_user.jpg';
    }
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
    console.log(FindPeopleDto);
    return await this.PeopleRepository.find(FindPeopleDto);
  }

  async return_all() {
    return await this.PeopleRepository.find();
  }

  async delete_people(user: Users, deletePeopleDto: DeletePeopleDto) {
    try {
      if (user.role == 'admin') {
        return await this.PeopleRepository.delete(deletePeopleDto);
      } else {
        return { message: 'permission denied' };
      }
    } catch (e) {
      return e;
    }
  }

  is_admin(user: Users) {
    return user.role === 'admin';
  }
}
