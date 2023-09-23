import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Category } from "./catgeory.entity";
import { Common } from "../common/common.entity";
import { Brand } from "./brand.entity";

@Entity('products')
export class Product extends Common {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'numeric' })
    price: number;

    @Column({ type: 'varchar', length: 255,name:'image_url' ,nullable:true})
    imageUrl: number;    

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand:Brand;

}