import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRouter";

const app = express();
const port = 3001;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongo connect"))
  .catch((err: any)=>console.log("faild to connect",err));

app.use('/user', userRoute);

  app.listen(port ,()=>
    {
        console.log(` http://localhost:${port}`)
    })
