import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../common/common.entity';
import { OTP } from './otp.entity';
import { PlanMembership } from '../plan/plan-membership.entity';
export enum USER_TYPE {
    FREE = "free",
    PAID = "paid"
}

@Entity('users')
export class Users extends Common {
    @PrimaryGeneratedColumn({type:'integer',})
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar',length:'12', unique: true })
    phone: string;
    
    @Column({ type: 'varchar',length:'255', unique: true,nullable: true})
    email: string;

    @Column({ type: 'text', nullable: true ,name:'refresh_token'})
    refreshToken: string;

    @Column({ type: 'enum',enum:USER_TYPE,default:USER_TYPE.FREE ,name:'user_type'})
    userType: USER_TYPE;

    @OneToMany(() => PlanMembership, (planMemberships) =>planMemberships.user)
    planMemberships: PlanMembership[];

}



