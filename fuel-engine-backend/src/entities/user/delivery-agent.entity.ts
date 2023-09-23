import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Common } from "../common/common.entity";
import { Users } from "./user.entity";
import { Order } from "../order/order.entity";

@Entity('delivery_agents')
export class DeliveryAgents extends Common {
    @PrimaryGeneratedColumn({type:'integer'})
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToOne(() => Users, (users) => users.deliveryAgent)
    user: Users;

    @OneToMany(() => Order, (order) => order.assignedDeliveryAgent)
    order: Order;
}
