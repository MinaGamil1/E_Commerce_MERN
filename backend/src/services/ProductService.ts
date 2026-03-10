import ProductModel from "../models/ProductModel";

export const getAllProducts = async () => {
    return await ProductModel.find();
};
export const seedInitialProducts = async () => {
    try {
    const Products =[
        {
            title: 'Dell Laptop',
            price: 15000,
            stock: 10,
            image: 'https://e7.pngegg.com/pngimages/887/86/png-clipart-silver-dell-laptop-dell-xps-13-9350-laptop-computer-laptop-electronics-netbook-thumbnail.png'
        },
        {
            title: 'Asus Laptop',
            price: 30000,
            stock: 8,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6doj2nyviPTR6W7QrjB3ffo_kK67LU_6DFQ&s'
        },
        {
            title: 'Apple Laptop',
            price: 50000,
            stock: 5,
            image: 'https://w7.pngwing.com/pngs/522/727/png-transparent-macbook-pro-laptop-apple-laptop-electronics-computer-laptop.png'
        },
    ];

    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) { 
        await ProductModel.insertMany(Products);
    };} catch (error) {
        console.error('Error seeding products:', error);
    }
};