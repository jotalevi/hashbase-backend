import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './create-report.dto';

@Controller('report')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    async create(@Body() dto: CreateReportDto) {
        return this.reportsService.reportTorrent(dto);
    }
}
