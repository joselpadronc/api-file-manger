import { Injectable } from '@nestjs/common';

import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';

@Injectable()
export class FilesService {
  create(reqData: any) {
    // const dbFileData = {
    //   name: reqData.body.name,
    // };

    const s3FileData = {
      originalname: reqData.file.originalname,
      mimetype: reqData.file.mimetype,
      buffer: reqData.file.buffer,
    };
    return s3FileData;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: any) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
