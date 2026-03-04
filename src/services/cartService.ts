import {CartModel} from "../models/cartModel";
interface CreateCartForUser {
    userId: string;
}


const creatCartForUser = async ({userId}: CreateCartForUser) => {
    const cart = await CartModel.create({userId, totalAmount: 0 ,items:[]});
    await cart.save();
    return cart;
}

interface getActiveCartForUser {
    userId: string;
}
export const getActiveCartForUser = async ({userId}: getActiveCartForUser) => {
    let cart = await CartModel.findOne({userId, status: "active"});
    if (!cart) {
    cart = await creatCartForUser({userId});
    }
    return cart;
    }