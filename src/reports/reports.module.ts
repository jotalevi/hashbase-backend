import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportEntity } from './report.entity';
import { TorrentEntity } from 'src/torrents/torrent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportEntity,
      TorrentEntity
    ])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule { }
