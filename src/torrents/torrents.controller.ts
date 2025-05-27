import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { TorrentsService } from './torrents.service';
import { CreateTorrentDto } from './create-torrent.dto';

@Controller('torrent')
export class TorrentsController {
    constructor(private readonly torrentsService: TorrentsService) { }

    @Post()
    async uploadTorrent(@Body() dto: CreateTorrentDto) {
        return this.torrentsService.createOrUpdateFromMagnet(dto);
    }

    @Get('search')
    async search(
        @Query('q') query: string,
        @Query('page') page = '1',
        @Query('limit') limit = '20',
    ) {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        return this.torrentsService.searchTorrents(query, pageNum, limitNum);
    }
    

    @Get(":infoHash")
    async getTorrentByInfoHash(@Param('infoHash') infoHash: string) {
        return this.torrentsService.getTorrentByInfoHash(infoHash);
    }
}
