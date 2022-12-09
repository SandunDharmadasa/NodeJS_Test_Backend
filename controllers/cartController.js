const Cart = require('../models/cart');
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler(async (req, res) => {
    const { name, amount, totalPrice } = req.body;

    if(!name || !amount || !totalPrice) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if product already exists
    const cart = await Cart.findOne({ name });

    //if product exists
    if (cart) {
        return res.status(400).json({
            success: false,
            message: 'This item already exists in the cart'
        });
    }

    //create product
    const newCartItem = new Cart({
        name,
        amount,
        totalPrice
    });

    //save feedback
    await newCartItem.save();

    if (newCartItem) {
        res.status(201).json({
            success: true,
            data: newCartItem
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Item not added to the cart'
        });
        throw new Error('Item not added to the cart');
    }
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.find();

    if (cart) {
        res.status(200).json({
            success: true,
            data: cart
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No items found'
        });
        throw new Error('No cart items found');
    }
});



module.exports = {
    addToCart,
    getCart
};