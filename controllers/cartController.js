const Cart = require('../models/cart');
const asyncHandler = require('express-async-handler');

//New commit

//Add Items to the cart
const addToCart = asyncHandler(async (req, res) => {
    const { name, amount, totalPrice } = req.body;

    //Validations
    if(!name || !amount || !totalPrice) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if item already exists in the cart
    const cart = await Cart.findOne({ name });

    //if item exists in the cart
    if (cart) {
        return res.status(400).json({
            success: false,
            message: 'This item already exists in the cart'
        });
    }

    //create cart item
    const newCartItem = new Cart({
        name,
        amount,
        totalPrice
    });

    //save item into the cart
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

//Retrieve all the items in the cart
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

//Update items in the cart
const editCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
        return res.status(400).json({
            success: false,
            message: 'No items found'
        });
    } else {
        const { name, amount, totalPrice } = req.body;

        cart.name = name;
        cart.amount = amount;
        cart.totalPrice= totalPrice;

        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });
    }
});

//Delete items in the cart
const deleteCart = asyncHandler(async (req, res)  => {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await cart.remove();
        
        res.status(200).json({
            success: true,
            message: 'Item deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const cart = await Cart.remove();

    if (!cart) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Cart deleted successfully'
        });
    }
});


module.exports = {
    addToCart,
    getCart,
    editCart,
    deleteCart,
    deleteAll
};