import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Product } from "../product/products.entity";
import { Order } from "./order.entity";
import { Common } from "../common/common.entity";

@Entity('order_items')
export class OrderItem extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'integer', name: 'quantity' })
    quantity: number;

    @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
    @JoinColumn({ name: 'order_id', })
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderItems, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

}