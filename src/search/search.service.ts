import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeiliSearch } from 'meilisearch';
import { TorrentEntity } from 'src/torrents/torrent.entity';

@Injectable()
export class SearchService implements OnModuleInit {
    private readonly client = new MeiliSearch({
        host: process.env.MEILI_HOST ?? 'http://localhost:7700',
    });

    private readonly indexName = 'torrents';

    constructor(
        @InjectRepository(TorrentEntity)
        private readonly torrentRepo: Repository<TorrentEntity>
    ) { }

    async onModuleInit() {
        const indexes = await this.client.getRawIndexes();
        const exists = indexes.results.some((i) => i.uid === this.indexName);
        if (!exists) {
            await this.client.createIndex(this.indexName, { primaryKey: 'id' });
            console.log(`✅ Meilisearch index '${this.indexName}' created`);
        }

        const torrents = await this.torrentRepo.find();
        const docs = torrents.map((t) => ({
            id: t.id,
            infoHash: t.infoHash,
            name: t.name,
            trackers: t.trackers,
            totalSize: t.totalSize,
            files: t.files?.map((f) => f.path) ?? [],
            tags: t.tags ?? [],
            updatedAt: t.updatedAt,
            createdAt: t.createdAt,
        }));

        if (docs.length > 0) {
            await this.client.index(this.indexName).addDocuments(docs);
            await this.client.index(this.indexName).updateSettings({
                sortableAttributes: ['updatedAt', 'createdAt'],
                rankingRules: [
                    'words',
                    'typo',
                    'proximity',
                    'attribute',
                    'sort',
                    'exactness',
                ],
            });
            console.log(`🔁 Reindexed ${docs.length} torrents into Meilisearch`);
        } else {
            console.log('ℹ️ No torrents found to reindex');
        }
    }

    async indexTorrent(t: TorrentEntity) {
        await this.client.index(this.indexName).addDocuments([
            {
                id: t.id,
                infoHash: t.infoHash,
                name: t.name,
                trackers: t.trackers,
                totalSize: t.totalSize,
                files: (t.files ?? []).map(f => f.path),
                updatedAt: t.updatedAt,
                createdAt: t.createdAt,
                tags: t.tags ?? [],
            },
        ]);
    }

    async searchTorrents(query: string, page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        return this.client.index(this.indexName).search(query, {
            offset,
            limit,
            sort: ['updatedAt:desc'], // optional default sort
        });
    }
      
}
