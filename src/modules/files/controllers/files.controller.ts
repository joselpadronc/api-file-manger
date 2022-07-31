import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';
import { CreateFileDbDto } from '../dto/create-file-db.dto';
import { CreateFileS3Dto } from '../dto/create-file-s3.dto';
import { UpdateFileDbDto } from '../dto/update-file-db.dto';

@ApiTags('Files')
@UseGuards(AuthGuard('jwt'))
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: CreateFileS3Dto, @Body() body: CreateFileDbDto) {
    return this.filesService.create(body, file);
  }

  @Get()
  getAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.filesService.findOne(id);
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    return name;
    return this.filesService.findByName(name);
  }

  @Get('download')
  findAndDownLoad(@Query('name') name: string) {
    return name;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFileDto: UpdateFileDbDto) {
    return this.filesService.update(id, updateFileDto);
  }
}
