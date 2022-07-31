import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { File } from '../entities/file.entity';
import { StorageService } from 'src/shared/storage/services/storage.service';
import { CreateFileDbDto } from '../dto/create-file-db.dto';
import { UpdateFileDbDto } from '../dto/update-file-db.dto';
import { CreateFileS3Dto } from '../dto/create-file-s3.dto';

@Injectable()
export class FilesService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async create(reqData: CreateFileDbDto, reqFile: CreateFileS3Dto) {
    const fileSavedS3 = await this.storageService.uploadFile(reqFile);

    const fileMimetype = reqFile.mimetype.split('/')[1];
    const fileUrl = fileSavedS3.Location;
    const fileName = reqData.name;
    const userId = parseInt(reqData.userId);
    if (userId === NaN)
      throw new NotFoundException(`The user ID field is not a number`);

    const dbFileData = {
      userId: userId,
      name: fileName,
      typeFile: fileMimetype,
      urlFile: fileUrl,
    };

    const newFileDb = await this.fileRepository.create(dbFileData);
    const fileSavedDb = await this.fileRepository.save(newFileDb);

    return fileSavedDb;
  }

  async findAll() {
    const files = await this.fileRepository.find();
    return files;
  }

  async findOne(fileId: number) {
    const file = await this.fileRepository.findOneBy({ id: fileId });

    if (!file) {
      throw new NotFoundException(`File with id: ${fileId} not found`);
    }

    return file;
  }

  async findByName(fileName: string) {
    const file = await this.fileRepository.findOneBy({ name: fileName });

    if (!file) {
      throw new NotFoundException(`File with name: "${fileName}" not found`);
    }

    return file;
  }

  async downloadFile(fileName: string) {
    console.log(fileName);
    // const getFileName = fileName.split('.')[0];
    // // const getFileExtension = fileName.split('.')[fileName.length - 1];
    // const file = await this.fileRepository.findOneBy({
    //   name: getFileName,
    //   // typeFile: getFileExtension,
    // });

    // if (!file) {
    //   throw new NotFoundException(`File with name: ${fileName} not found`);
    // }

    return 'hola';
  }

  async update(id: number, fileData: UpdateFileDbDto) {
    const file = await this.findOne(id);

    const newFile = await this.fileRepository.merge(file, fileData);
    const fileUpdated = await this.fileRepository.save(newFile);

    return fileUpdated;
  }
}
