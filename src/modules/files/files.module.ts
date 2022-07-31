import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { File } from './entities/file.entity';
import { StorageModule } from 'src/shared/storage/storage.module';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
