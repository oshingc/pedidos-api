import { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderRepository } from "../repositories/orderRepository";
import { findProductById } from "../helpers/productHelper";
import { findOrderById } from "../helpers/orderHelper";
import { mongodbDatabase } from "../adapters/mongodbDatabase";
import { sqlliteDatabase } from "../adapters/sqliteDatabase";
import dotenv from "dotenv";
import { Database } from "../interfaces/database";

const result = dotenv.config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
    process.exit(1); // Salir si no se pudo cargar el archivo .env
}

// Dynamically decide which database to use
const dbAdapter: Database<Order> = process.env.DATABASE_TYPE === 'mongodb'
    ? new mongodbDatabase<Order>() 
    : new sqlliteDatabase<Order>();

const orderRepository = new OrderRepository(dbAdapter);

const orders: Order[] = [];

export const createOrder = (request: Request, response: Response) => {
    const productId = parseInt(request.body.productId);
    const product = findProductById(productId);
    const quantity = request.body.quantity;
    if (!!product && product.isInStock(quantity)) {
        const id = orders.length + 1;
        const productId = request.body.productId;
        const newOrder = new Order(id, quantity, productId);
        orderRepository.create(newOrder);
        response.send("Success");
    }
    else {
        response.status(500).send("An error ocurred");
    }
    return;

}

export const getAllOrders = (request: Request, response: Response) => {
    try {
        const rows = orderRepository.getAll();
        response.send(rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        response.status(500).send("An error ocurred");
        return;
    }
}

export const findOrderByIdHandler = (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const order = findOrderById(id);
    response.send(order);
    return;
}

export const updateOrder = (request: Request, response: Response) => {
    const orderId = parseInt(request.params.id);
    const { productId, quantity } = request.body;
    const orderUpdated = findOrderById(orderId);
    if (orderUpdated) {
        orderUpdated.setProductId(productId);
        orderUpdated.setQuantity(quantity);
    }
    response.send(orderUpdated)
}

export const deleteOrder = (request: Request, response: Response) => {
    const orderId = parseInt(request.params.id);
    const orderIndex = orders.findIndex(x => x.getId() == orderId);
    orders.splice(orderIndex, 1);
    response.send(orders);
}