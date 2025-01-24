export class Order {

    private id: number;
    private productId: number;
    private quantity: number;

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