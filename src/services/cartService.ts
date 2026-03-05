import { CartModel } from "../models/cartModel";
import ProductModel from "../models/ProductModel";
interface CreateCartForUser {
  userId: string;
}

const creatCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await creatCartForUser({ userId });
  }
  return cart;
};
interface addItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if (existsInCart) {
    return { data: "Item Already exists in cart", statusCode: 400 };
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  cart.items.push({ product: productId, unitPrice: product.price, quantity });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 201 };
};
