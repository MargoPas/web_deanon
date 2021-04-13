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
import { CreatePeopleDto } from './dto/create-people.dto';

@Controller('api/uploading_people')
export class PeopleController {
  constructor(private readonly PeopleService: PeopleService) {}

  @Post(':userid/Photo')
  @UseInterceptors(FileInterceptor('file', { dest: './Photo' }))
  async uploadSingle(@UploadedFile() file, @Param('userid') userId) {
    console.log(file);
    await this.PeopleService.setPhoto(userId, `${file.path}`);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file', { dest: './Photo' }))
  async createPeople(
    @UploadedFile() file,
    @Body() createPeopleDto: CreatePeopleDto,
  ) {
    console.log(file)
    return this.PeopleService.create(createPeopleDto, `${file.path}`);
  }
  @Get('photo/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'Photo' });
  }
}
