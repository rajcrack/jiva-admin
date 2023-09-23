import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../common/common.entity';


@Entity('otp')
export class OTP extends Common {
    @PrimaryGeneratedColumn({type:'integer'})
    id: number;

    @Column({ type:'integer' })
    otp: number;

    @Column({ type: 'boolean', name:'is_active',default:true })
    isActive: boolean;   
    
    @Column({ type: 'text', name:'destination' })
    destination: string;

    @Column({name:'expires_at',type:'timestamp',default: () => "CURRENT_TIMESTAMP + INTERVAL 5 MINUTE" })
    expiresAt:Date;
}



