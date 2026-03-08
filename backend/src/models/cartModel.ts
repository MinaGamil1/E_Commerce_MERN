import mongoose,{Schema,Document,ObjectId} from "mongoose";
import { IProduct } from "./ProductModel";
import router from "../routes/userRouter";
import validateJWT from "../middlewares/validateJWT";



const cartStatusEnum = ["active", "completed"] ;
export interface ICartItem {
    product: IProduct;
    unitPrice: number;
    quantity: number;

}


export interface ICart extends Document 
{
    userId:ObjectId | string;
    items:ICartItem[];
    totalAmount: number;    
    status:"active" | "completed" ;
}

const CartSchema: Schema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true ,default: 1}
});

const cartSchema: Schema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartSchema],
    totalAmount: { type: Number, required: true ,default: 0},
    status: { type: String, enum: cartStatusEnum, default: 'active' }
});
export const CartModel = mongoose.model<ICart>('Cart', cartSchema);