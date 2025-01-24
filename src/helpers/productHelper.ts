// src/helpers/productHelper.ts
import { Product } from "../models/product";

let products: Product[] = [
    new Product(1, "Laptop", 10.0, 5),
    new Product(2, "Mouse", 20.0, 10),
];

export const getProducts = (): Product[] => products;

export const findProductById = (id: number): Product | undefined => {
    return products.find(product => product.getId() === id);
};
