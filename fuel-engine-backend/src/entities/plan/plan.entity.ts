import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../common/common.entity';
import { PlanMembership } from './plan-membership.entity';

@Entity('plan')
export class Plan extends Common {
    @PrimaryGeneratedColumn({type:'integer',})
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'integer',name:'no_of_products_allowed' })
    noOfProductsAllowed:number;

    @Column({ type: 'integer',name:'expires_in' })
    expiresIn:number;
    
    @Column({ type: 'boolean', name:'is_active',default:true })
    isActive: boolean;

    @OneToMany(() => PlanMembership, (planMemberships) =>planMemberships.plan)
    planMemberships: PlanMembership[];

}



