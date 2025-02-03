import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_order")
export class Order implements Record<string, unknown> {
    [key: string]: unknown;
    
    @PrimaryGeneratedColumn({ name: "order_id" })
    private id!: number;

    @Column({ name: "product_id" })
    private productId!: number;

    @Column({ name: "quantity", type: "int" })
    private quantity!: number;

    constructor(id: number,
                productId: number,
                quantity: number) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }

    public getId = () => {
        return this.id;
    }
    public setId = (value: number) => {
        this.id = value;
    }

    public getProductId = () => {
        return this.productId;
    }

    public setProductId = (value: number) => {
        this.productId = value;
    }

    public getQuantity = () => {
        return this.quantity;
    }

    public setQuantity = (value: number) => {
        this.quantity = value;
    }
    
};