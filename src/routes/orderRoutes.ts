import Router from "express";
import {
    getAllOrders,
    findOrderByIdHandler,
    createOrder,
    updateOrder, 
    deleteOrder
} from "../controllers/orderController";

const router = Router();

router.get("/", getAllOrders);

router.get("/:id", findOrderByIdHandler);

// Create a new product
router.post("/", createOrder);

// Update a product by ID
router.put("/:id", updateOrder);

// Delete a product by ID
router.delete("/:id", deleteOrder);

export default router;