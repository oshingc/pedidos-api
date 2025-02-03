import { Product } from "../models/product";
import { Database } from "../interfaces/database";

export class ProductRepository {

    private db: Database<Product>;

    constructor(db: Database<Product>) {
        this.db = db;
    }

    async getAll() {
        return await this.db.find("t_product");
    }

    async findById(productId: number) {
        
        const products = await this.db.find("t_product", { id: productId } as Record<string, unknown>);
        return products[0];
    }

    async create(product: Product) {
        await this.db.insert("t_product", product);
    }

    async update(product: Product) {
        const data = product.toJSON();
        await this.db.update("t_product", product.getId(), data);
    }

    async delete(productId: number) {
        return await this.db.delete("t_product", productId);
    }

}