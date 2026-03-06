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
  console.log("cart", cart);

  return { data: updatedCart, statusCode: 201 };
};

interface updateItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: updateItemToCart) => {
  const cart = await getActiveCartForUser({ userId });  
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  } 
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter((p) => p.product.toString()!== productId);
  console.log("otherCartItems", otherCartItems);
  let total = otherCartItems.reduce((sum,product) => {sum +=product.quantity * product.unitPrice  ;
  return sum;
  }, 0);
  existsInCart.quantity = quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
