import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Common } from "../common/common.entity";
import { Product } from "./products.entity";

@Entity('brand')
export class Brand extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 255,name:'image_url',nullable:true })
    imageUrl: number;    

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
