import {Request, Response} from "express";
import {Product} from "../models/product";
import { getProducts, findProductById } from "../helpers/productHelper";
import { error } from "console";

//fetch products
export const getAllProducts = (req: Request, res: Response) => {
    res.json(getProducts());
    return;
};

export const findProductByIdHandler = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const product = findProductById(id);

    if (!product) {
        res.status(404).json({ error: "Product Not Found" });
        return;
    }

    res.json(product);
};

export const createProduct = (req: Request, res: Response) => {
    const products = getProducts();
    const id = products.length + 1;

    if (!req.body.name || req.body.name.length === 0) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    if (!req.body.price || req.body.price <= 0) {
        res.status(400).json({ error: "Price is not valid" });
        return;
    }
    if (!req.body.stock || req.body.stock <= 0) {
        res.status(400).json({ error: "Stock is not valid" });
        return;
    }

    const { name, price, stock } = req.body;

    const product = new Product(id, name, parseFloat(price), parseInt(stock));

    try {
        products.push(product);
    } catch(error) {
        res.status(500).json({ error: "Internal server error"})
    }
    
    res.status(201).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(!req.body.name || req.body.name.length === 0) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    if(!req.body.price || req.body.price <= 0) {
        res.status(400).json({ error: "Price is not valid" });
        return;
    }
    if(!req.body.stock || req.body.stock <= 0) {
        res.status(400).json({ error: "Stock is not valid" });
        return;
    }
    const { name, price, stock } = req.body;

    const product = findProductById(id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    product.setName(name);
    product.setPrice(parseFloat(price));
    product.setStock(parseInt(stock));

    res.json(product);
};

export const deleteProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const products = getProducts();
    const index = products.findIndex(p => p.getId() === id);

    if (index === -1) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    products.splice(index, 1);
    res.status(204).send();
};
