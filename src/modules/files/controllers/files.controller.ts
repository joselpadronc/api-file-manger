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
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get('external')
  getExternalImages(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
  ) {
    const params = {
      page,
      perPage,
      search,
    };
    return this.filesService.externalImages(params);
  }

  @Get('/download')
  async downloadByName(@Query('name') name: string, @Res() res: Response) {
    return await this.filesService.downloadFileByName(name, res);
  }

  @Get('/download')
  async downloadById(@Query('id') id: number, @Res() res: Response) {
    return await this.filesService.downloadFileById(id, res);
  }

  @Get('/link')
  async getLinkByName(@Query('name') name: string) {
    const file = await this.filesService.findByName(name);
    return {
      url: file.urlFile,
    };
  }

  @Get('/link')
  async getLinkById(@Query('id') id: number) {
    const file = await this.filesService.findOne(id);
    return {
      url: file.urlFile,
    };
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.filesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFileDto: UpdateFileDbDto) {
    return this.filesService.update(id, updateFileDto);
  }
}
