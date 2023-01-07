import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import typeRoute from "./Routes/TypesRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import cors from "cors";
import EmailSender from "./sendEmail.js";
// import products from "./data/Products.js";
// import types from "./data/Types.js";




dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/types", typeRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// app.get("/api/products",(req,res) =>{
//   res.json(products)
// })

// app.get("/api/types",(req,res) =>{
//   res.json(types)
// })

// app.get("/api/products/:id",(req,res) =>{
//   const product = products.find((p) => p._id === req.params.id);
// res.json(product);
// });
// app.post("/send", async (req, res) => {
//   try {
//     const { orderItems,shippingAddress} = req.body
//     EmailSender({orderItems,shippingAddress})
//     res.json({ msg: "Your message sent successfully" });
//   } catch (error) {
//     res.status(404).json({ msg: "Error ❌" });
//   }
// });

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
