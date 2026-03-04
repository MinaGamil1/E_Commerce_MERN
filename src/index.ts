import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRouter";
import ProductRoute from "./routes/ProductRoute";
import { seedInitialProducts } from "./services/ProductService";
import cartRoute from "./routes/cartRoute";

const app = express();
const port = 3001;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
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
