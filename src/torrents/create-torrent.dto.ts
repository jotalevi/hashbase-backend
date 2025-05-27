import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateTorrentDto {
    @IsString()
    @IsNotEmpty()
    magnet: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

}
