import mongoose ,{Schema,Document} from "mongoose";

export interface IProduct extends Document {
    title: string;
    price: number;
    stock: number;
    image: string;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true ,default: 0},
    image: { type: String, required: true }
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;