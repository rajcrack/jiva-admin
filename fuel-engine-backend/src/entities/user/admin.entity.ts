import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '../common/common.entity';


@Entity('admin')
export class Admin extends Common {
    @PrimaryGeneratedColumn({ type: 'integer', })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', unique: true })
    phone: string;

    @Column({ type: 'varchar', length: '255', unique: true, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'text', nullable: true, name: 'refresh_token' })
    refreshToken: string;

}



