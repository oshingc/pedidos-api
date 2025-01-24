import express from "express";
import productRoutes from "./routes/productRoutes"
import orderRoutes from "./routes/orderRoutes"

const server = express();
server.use(express.json());
server.use("/api/products", productRoutes)
server.use("/api/orders", orderRoutes)

server.listen(8080, () => {
    console.log('listening 8080');
});
server.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
