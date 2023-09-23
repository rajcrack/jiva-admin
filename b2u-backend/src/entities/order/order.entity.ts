import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Common } from "../common/common.entity";
import { Shopkeeper } from "../user/shop.entity";
import { DeliveryAgents } from "../user/delivery-agent.entity";
import { OrderItem } from "./order-items.entity";
export enum ORDER_STATUS {
    PENDING = "pending",
    ASSIGNED_TO_DELIVERY_AGENT = "assigned_to_delivery_agent",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

@Entity('orders')
export class Order extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'timestamp', nullable: true ,name:"delivered_at"})
    deliveredAt: Date;

    @Column({ type: 'enum',enum:ORDER_STATUS, default: ORDER_STATUS.PENDING })
    status: ORDER_STATUS;

    @ManyToOne(() => Shopkeeper)
    @JoinColumn({ name: 'buyer_id' })
    buyer: Shopkeeper;

    @ManyToOne(() => DeliveryAgents)
    @JoinColumn({ name: 'assigned_delivery_agent_id' })
    assignedDeliveryAgent: DeliveryAgents;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];


}
