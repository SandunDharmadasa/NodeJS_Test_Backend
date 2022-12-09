const Products = require('../models/product');
const asyncHandler = require('express-async-handler');

const addProduct = asyncHandler(async (req, res) => {
    const { name, description, qty, price } = req.body;

    if(!name || !description || !qty || !price) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if product already exists
    const product = await Products.findOne({ name });

    //if product exists
    if (product) {
        return res.status(400).json({
            success: false,
            message: 'Product already exists with this name'
        });
    }

    //create product
    const newProduct = new Products({
        name, 
        description,
        qty,
        price
    });

    //save feedback
    await newProduct.save();

    if (newProduct) {
        res.status(201).json({
            success: true,
            data: newProduct
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Product not added'
        });
        throw new Error('Product not added');
    }
});

const getProducts = asyncHandler(async (req, res) => {
    const product = await Products.find();

    if (product) {
        res.status(200).json({
            success: true,
            data: product
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No products found'
        });
        throw new Error('No research products found');
    }
});



module.exports = {
    addProduct,
    getProducts
};