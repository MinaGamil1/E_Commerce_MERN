import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRouter";
import ProductRoute from "./routes/ProductRoute";
import { seedInitialProducts } from "./services/ProductService";
import cartRoute from "./routes/cartRoute";
import  cors from "cors";
dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DATABASE_URL || '')
  .then(() => console.log("mongo connect"))
  .catch((err: any)=>console.log("faild to connect",err));

  //seed the products to the database

  seedInitialProducts();

app.use('/user', userRoute);
app.use('/products', ProductRoute);
app.use('/cart', cartRoute);
  app.listen(port ,()=>
    {
        console.log(` http://localhost:${port}`)
    })
