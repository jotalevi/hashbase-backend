import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { TorrentEntity } from 'src/torrents/torrent.entity';
import { CreateReportDto } from './create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepo: Repository<ReportEntity>,
        @InjectRepository(TorrentEntity)
        private readonly torrentRepo: Repository<TorrentEntity>,
    ) { }

    async reportTorrent(dto: CreateReportDto): Promise<ReportEntity> {
        const torrent = await this.torrentRepo.findOne({ where: { infoHash: dto.infoHash } });

        if (!torrent) {
            throw new NotFoundException('Torrent not found');
        }

        const report = this.reportRepo.create({
            torrent,
            type: dto.type,
            message: dto.message,
        });

        return this.reportRepo.save(report);
    }
}
