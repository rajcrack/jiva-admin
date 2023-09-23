import { DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export class Common {
    @CreateDateColumn({ name: "created_at", type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: 'timestamp' })
    deletedAt: Date;
}
