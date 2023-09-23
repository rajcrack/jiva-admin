import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Common } from "../common/common.entity";
import { Product } from "./products.entity";

@Entity('category')
export class Category extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
