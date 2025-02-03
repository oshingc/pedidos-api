import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_product")
export class Product implements Record<string, unknown> {
    [key: string]: unknown;
    
    @PrimaryGeneratedColumn({ name: "product_id" })
    private id!: number;

    @Column({ name: "product_name", type: "varchar" })
    private name!: string;

    @Column({ name: "price", type: "float" })
    private price!: number;

    @Column({ name: "stock", type: "int" })
    private stock!: number;

    constructor(
        id: number,
        name: string,
        price: number,
        stock: number) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.stock = stock;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock
        };
    }

	public getId = (): number => {
		return this.id;
	}

	public setId(value: number) {
		this.id = value;
	}
    
	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}

    public getPrice() : number {
        return this.price;
    }

    public setPrice(value: number) {
        this.price = value;
    }

    public getStock() {
        return this.stock;
    }

    public setStock(value: number) {
        this.stock = value;
    }

    isInStock = (quantity: number) => {
        return this.stock >= quantity;
    }
}


