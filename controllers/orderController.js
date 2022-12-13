const Order = require('../models/order');
const asyncHandler = require('express-async-handler');

//Place Order
const addOrder = asyncHandler(async (req, res) => {
    const { total, netTax, delivery, value, cusName, address, mobile} = req.body;

    //Validation
    if(!total || !netTax || !delivery || !value || !cusName || !address || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //create Order
    const newOrder = new Order({
        total,
        netTax, 
        delivery, 
        value, 
        cusName, 
        address, 
        mobile
    });

    //save order
    await newOrder.save();

    if (newOrder) {
        res.status(201).json({
            success: true,
            data: newOrder
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




module.exports = {
    addOrder
};