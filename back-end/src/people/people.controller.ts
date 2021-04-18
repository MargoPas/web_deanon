import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { extname } from 'path';
import { PeopleService } from './people.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePeopleDto } from './dto/create-people.dto';
import { FindPeopleDto } from './dto/find-people.dto';
import JwtAuthenticationGuard from '../common/guard/jwt.auth.guard';

@Controller('api/uploading_people')
export class PeopleController {
  constructor(private readonly PeopleService: PeopleService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('/create')
  async createPeople(@Body() createPeopleDto: CreatePeopleDto) {
    try {
      console.log(createPeopleDto);
      await this.PeopleService.create(createPeopleDto);
      return { message: 'ok' };
    } catch (e) {
      return e;
    }
  }

  @Post('find_people')
  async find(@Body() FindPeopleDto: FindPeopleDto) {
    try {
      return await this.PeopleService.findAll(FindPeopleDto);
    } catch (e) {
      return e;
    }
  }

  @Get('photo/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'Photo' });
  }
}
