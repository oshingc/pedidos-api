import { Order } from "../models/order";

let orders: Order[] = [];

export const getOrders = (): Order[] => orders;

export const findOrderById = (id: number): Order | undefined => {
    return orders.find(order => order.getId() === id);
};
