import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { extname } from 'path';
import { PeopleService } from './people.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {CreatePeopleDto} from "./dto/create-people.dto";

@Controller('api/uploading_people')
export class PeopleController {
  constructor(private readonly PeopleService: PeopleService) {}

  @Post(':userid/Photo')
  @UseInterceptors(FileInterceptor('file', { dest: './Photo' }))
  async uploadSingle(@UploadedFile() file, @Param('userid') userId) {
    console.log(file);
    await this.PeopleService.setPhoto(userId, `${file.path}`);
  }
  // uploadPhoto(@Param('userid') userId, @UploadedFile() file) {
  //  console.log('tut');
  //   this.PeopleService.setPhoto(
  //     userId,
  //   `${'http://localhost:3000/'}${file.path}`,
  // );
  //  console.log(`${'http://localhost:3000/'}${file.path}`);
  // }

  @Post('/create')
  async createPeople(@Body() createPeopleDto: CreatePeopleDto) {
    return this.PeopleService.create(createPeopleDto);
  }
  @Get('photo/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'Photo' });
  }
}
