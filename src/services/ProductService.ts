import { get } from "mongoose";
import ProductModel from "../models/ProductModel";

export const getAllProducts = async () => {
    return await ProductModel.find();
};
export const seedInitialProducts = async () => {
    const Products =[
        {
            title: 'Dell Laptop',
            price: 15000,
            stock: 10,
            image: '../imgs/dell-laptop.jpg'
        },
    ];

    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
        await ProductModel.insertMany(Products);
    };
};