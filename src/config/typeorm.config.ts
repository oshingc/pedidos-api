import { DataSource } from "typeorm";
import { Product } from "../models/product";
import { Order } from "../models/order";
import { Client } from "../models/client";
import { OrderProduct } from "../models/orderProduct";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database/pedidos-api.db",
    synchronize: true,
    logging: true,
    entities: [Product, Order, Client, OrderProduct]
}); 