import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TorrentEntity } from './torrent.entity';
import { SearchService } from 'src/search/search.service';
import { parseMagnetLink, parseTorrentBuffer } from 'src/utils/parsers';
import { CreateTorrentDto } from './create-torrent.dto';
import { extTagger, sizeTagger, trackerTagger } from 'src/utils/tagger';
import { torrentFromMagnet } from 'src/utils/torrentFromMagnet';

@Injectable()
export class TorrentsService {
    constructor(
        @InjectRepository(TorrentEntity)
        private readonly torrentRepo: Repository<TorrentEntity>,
        private readonly searchService: SearchService,
    ) { }

    async createOrUpdateFromMagnet(dto: CreateTorrentDto): Promise<TorrentEntity> {
        const torrentBuffer = await torrentFromMagnet(parseMagnetLink(dto.magnet).infoHash);

        console.log('Buffer head preview:', torrentBuffer.toString('utf8', 0, 50));

        const parsed = parseTorrentBuffer(torrentBuffer);
        const infoHash = parsed.infoHash?.toLowerCase();

        if (!infoHash) throw new Error('Invalid magnet link');

        let torrent = await this.torrentRepo.findOne({
            where: { infoHash },
            relations: ['reports']
        });

        if (torrent) {
            let modified = false;

            if (torrent.name === 'Unknown' && parsed.name) {
                torrent.name = parsed.name;
                modified = true;
            }

            if (parsed.trackers?.length) {
                const existingTrackers = new Set(torrent.trackers);
                let added = false;

                for (const tr of parsed.trackers) {
                    if (!existingTrackers.has(tr)) {
                        torrent.trackers.push(tr);
                        added = true;
                    }
                }

                if (added) modified = true;
            }

            if (modified) {
                await this.torrentRepo.save(torrent);
            }

            if (torrent.reports.length > 0) {
                torrent.reports = torrent.reports.map(report => ({
                    ...report,
                    torrent: undefined, // Avoid circular reference
                })) as any[];
            }
            await this.searchService.indexTorrent(torrent);

            return torrent;
        }



        torrent = this.torrentRepo.create({
            infoHash,
            name: parsed.name || 'Unknown',
            magnet: dto.magnet,
            trackers: parsed.trackers || [],
            totalSize: 0,
            createdAt: new Date(),
            isMultiFile: false,
            files: parsed.files,
        });

        torrent.tags = Array.from(new Set([
            ...extTagger(parsed.files),
            ...sizeTagger(torrent.totalSize),
            ...trackerTagger(torrent.trackers),
            ...(dto.tags ?? []),
        ].map(t => t.toLowerCase().trim()).filter(Boolean)));

        await this.searchService.indexTorrent(torrent);

        return this.torrentRepo.save(torrent);
    }

    async getTorrentByInfoHash(infoHash: string): Promise<TorrentEntity | null> {
        let returnable = await this.torrentRepo.findOne({
            where: {
                infoHash: infoHash.toLowerCase()
            },
            relations: ['reports']
        });

        if (!returnable) return null;

        if (returnable.reports.length > 0) {
            returnable.reports = returnable.reports.map(report => ({
                ...report,
                torrent: undefined,
            })) as any[];
        }

        return returnable;
    }

    async searchTorrents(query: string, page = 1, limit = 20): Promise<any> {
        return this.searchService.searchTorrents(query, page, limit);
    }

}
