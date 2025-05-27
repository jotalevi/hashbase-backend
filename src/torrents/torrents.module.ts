import { Module } from '@nestjs/common';
import { TorrentsController } from './torrents.controller';
import { TorrentsService } from './torrents.service';
import { SearchModule } from 'src/search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentEntity } from './torrent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TorrentEntity]),
    SearchModule,
  ],
  controllers: [TorrentsController],
  providers: [TorrentsService]
})
export class TorrentsModule {}
