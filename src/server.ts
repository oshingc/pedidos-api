import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes"
import orderRoutes from "./routes/orderRoutes"
import { AppDataSource } from "./config/typeorm.config";

// Cargar variables de entorno
dotenv.config();

const server = express();
const port = process.env.PORT || 8080;

// Middleware para parsear JSON
server.use(express.json());

// Rutas
server.use("/api/products", productRoutes)
server.use("/api/orders", orderRoutes)

// Iniciar servidor después de conectar a la base de datos
AppDataSource.initialize().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => console.log(error));

// Error handler
server.use((err: Error, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
