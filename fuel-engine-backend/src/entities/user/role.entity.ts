import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Common } from "../common/common.entity";
import { Users } from "./user.entity";

@Entity('role')
export class Role extends Common {
    @PrimaryGeneratedColumn({type:'integer'})
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Users, (users) => users.role)
    users: Users[];
}
