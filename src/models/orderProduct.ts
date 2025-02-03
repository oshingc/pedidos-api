import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_order_product")
export class OrderProduct implements Record<string, unknown> {
    [key: string]: unknown;
    
    @PrimaryGeneratedColumn({ name: "order_product_id" })
    private id!: number;

    @Column({ name: "order_id" })
    private orderId!: number;

    @Column({ name: "product_id" })
    private productId!: number;

    @Column({ name: "quantity", type: "int" })
    private quantity!: number;

    constructor(id: number, orderId: number, productId: number, quantity: number) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }

    toJSON() {
        return {
            id: this.id,
            orderId: this.orderId,
            productId: this.productId,
            quantity: this.quantity
        };
    }

    public getId = (): number => {
        return this.id;
    }
} 