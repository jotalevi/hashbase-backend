import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeiliSearch } from 'meilisearch';
import { TorrentEntity } from './torrents/torrent.entity';

@Controller('health')
export class HealthController {
  constructor(
    @InjectRepository(TorrentEntity)
    private readonly torrentRepo: Repository<TorrentEntity>,
  ) { }

  @Get()
  async getHealth() {
    const dbStatus = await this.torrentRepo.count().then(() => 'connected').catch(() => 'error');

    const meili = new MeiliSearch({ host: process.env.MEILI_HOST ?? 'http://localhost:7700' });
    const searchStatus = await meili.health().then(() => 'available').catch(() => 'unavailable');

    return {
      status: 'ok',
      db: dbStatus,
      search: searchStatus,
    };
  }
}
