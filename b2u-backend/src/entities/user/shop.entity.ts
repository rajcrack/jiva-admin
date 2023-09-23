import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../common/common.entity';
import { Users } from './user.entity';

@Entity('shopkeepers')
export class Shopkeeper extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255, name: 'business_name' })
    businessName: string;

    @Column({ type: 'varchar', length: 255 })
    state: string;

    @Column({ type: 'varchar', length: 255 })
    district: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'integer', default:0 })
    points: number;
    
    @OneToOne(() => Users, (users) => users.shopkeeper)
    @JoinColumn({ name: 'owner_id' })
    owner: Users;
}



