import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { User } from 'src/modules/users/entities/user.entity';
import { File } from 'src/modules/files/entities/file.entity';

const DataSource = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'file-manager-db.sqlite',
  entities: [User, File],
  synchronize: true,
});
@Global()
@Module({
  imports: [DataSource],
  exports: [DataSource],
})
export class DatabaseModule {}
