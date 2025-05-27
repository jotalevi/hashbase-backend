import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentEntity } from 'src/torrents/torrent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TorrentEntity]),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
