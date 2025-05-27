import { TorrentEntity } from 'src/torrents/torrent.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

export type ReportType = 'positive' | 'negative';

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TorrentEntity, { eager: true })
    torrent: TorrentEntity;

    @Column()
    type: ReportType;

    @Column({ nullable: true })
    message: string;

    @CreateDateColumn()
    reportedAt: Date;
}
