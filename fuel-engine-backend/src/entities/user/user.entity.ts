import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../common/common.entity';
import { Role } from './role.entity';
import { Shopkeeper } from './shop.entity';
import { DeliveryAgents } from './delivery-agent.entity';

@Entity('users')
export class Users extends Common {
    @PrimaryGeneratedColumn({type:'integer',})
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', unique: true })
    phone: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'text', nullable: true ,name:'refresh_token'})
    refreshToken: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToOne(() => Shopkeeper, (shopkeeper) => shopkeeper.owner)
    shopkeeper: Shopkeeper;

    @OneToOne(() => DeliveryAgents, (deliveryAgent) => deliveryAgent.user)
    deliveryAgent: DeliveryAgents;
}



