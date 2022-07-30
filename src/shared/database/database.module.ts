import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbUser, dbPort, dbName, dbPassword, dbHost } =
          configService.database;
        return {
          type: 'mysql',
          host: dbHost,
          port: parseInt(dbPort),
          username: dbUser,
          password: dbPassword,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
