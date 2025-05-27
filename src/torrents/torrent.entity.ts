import { ReportEntity } from 'src/reports/report.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class TorrentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    magnet: string;

    @Column({ unique: true })
    infoHash: string;

    @Column()
    name: string;

    @Column('bigint')
    totalSize: number;

    @Column({ type: 'text', array: true, default: [] })
    tags: string[];


    @Column({ type: 'text', array: true, default: [] })
    trackers: string[];

    @Column()
    isMultiFile: boolean;

    @OneToMany(() => ReportEntity, report => report.torrent, { cascade: true })
    reports: ReportEntity[];

    @Column('jsonb')
    files: { path: string; size: number; type: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
