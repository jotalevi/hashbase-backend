import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentsModule } from './torrents/torrents.module';
import { ReportsModule } from './reports/reports.module';
import { SearchModule } from './search/search.module';
import { HealthController } from './app.controller';
import { TorrentEntity } from './torrents/torrent.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([TorrentEntity]),
    TorrentsModule,
    ReportsModule,
    SearchModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
