import { CartModel } from "../models/cartModel";
import ProductModel from "../models/ProductModel";
interface CreateCartForUser {
  userId: string;
}

const creatCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0, items: [] });
  await cart.save();
  return cart;
};

interface getActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await creatCartForUser({ userId });
  }
  return cart;
};
interface addItemToCart {
  userId: string;
  porductId: any;
  quantity: number;
}

export const addItemToCart = async ({
  porductId,
  quantity,
  userId,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find((p) => p.product.toString() === porductId);
  if (existsInCart) {
    return { data: "Item Already exists in cart", status: 400 };
  }
  const product = await ProductModel.findById(porductId);
  if (!product) {
    return { data: "Product not found", status: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low stock for item", status: 400 };
  }
  cart.items.push({ product: porductId, unitPrice: product.price, quantity });
    cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
