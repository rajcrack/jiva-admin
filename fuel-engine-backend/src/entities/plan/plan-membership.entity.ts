import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Common } from "../common/common.entity";
import { Users } from "../user/user.entity";
import { Plan } from "./plan.entity";


@Entity('plan_membership')
export class PlanMembership extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'boolean', name:'is_active',default:true })
    isActive: boolean;
    
    @Column({ type: 'date',name:'expires_at' })
    expiresAt:Date;
    
    @Column({ type: 'text',name:'transaction_id' })
    transactionId:string;

    @ManyToOne(() => Users, (user) => user.planMemberships,{nullable:false})
    @JoinColumn({ name: 'user_id' })
    user: Users;    

    @ManyToOne(() => Plan, (plan) =>plan.planMemberships,{nullable:false})
    @JoinColumn({ name: 'plan_id' })
    plan: Plan;
}
