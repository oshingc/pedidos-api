// src/models/product.ts
export class Product {
    
    private id: number;
    private name: string;
    private price: number;
    private stock: number;

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

	public getId(): number {
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


