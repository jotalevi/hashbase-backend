import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    infoHash: string;

    @IsIn(['positive', 'negative'])
    type: 'positive' | 'negative';

    @IsOptional()
    @IsString()
    message?: string;
}
