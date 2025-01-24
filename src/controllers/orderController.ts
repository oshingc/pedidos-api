import { Request, response, Response } from "express";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { findProductById } from "../helpers/productHelper";
import { findOrderById, getOrders } from "../helpers/orderHelper";
const db = require('../config/database.js');

let orders: Order[] = [];

export const createOrder = (request: Request, response: Response) => {
    const productId = parseInt(request.params.productId);
    const product = findProductById(productId);
    const quantity = request.body.quantity;
    if (!!product && product.isInStock(quantity)) {
        const id = orders.length + 1;
        const productId = request.body.productId;
        const newOrder = new Order(id, quantity, productId);
        orders.push(newOrder);
        response.send("Success");
    }
    else {
        response.status(500).send("An error ocurred");
    }
    return;

}

export const getAllOrders = (request: Request, response: Response) => {
    const query = `SELECT * FROM t_order`;
    db.all(query, [], (err: any, rows: any) => {
        if(err) {
            response.status(500).send("An error ocurred");
            return;
        }
        response.send(rows);
    });
    return;
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
    if (!!orderUpdated) {
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