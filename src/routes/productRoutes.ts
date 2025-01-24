import Router from "express";
import {
    getAllProducts,
    findProductByIdHandler,
    createProduct,
    updateProduct, 
    deleteProduct
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", findProductByIdHandler);

// Create a new product
router.post("/", createProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;