import { Order } from "../models/order";
import { Database } from "../interfaces/database";

export class OrderRepository {

    private db: Database<Order>;

    constructor(db: Database<Order>) {
        this.db = db;
    }

    async getAll() {
        return await this.db.find("t_order");
    }

    async findById(orderId: number) {
        const orders = await this.db.find("t_order", { id: orderId });
        return orders[0];
    }

    async create(order: Order) {
        await this.db.insert("t_order", order);
    }

    async update(order: Order) {
        await this.db.update("t_order", order.getId(), order);
    }

    async delete(orderId: number) {
        return await this.db.delete("t_order", orderId);
    }

}