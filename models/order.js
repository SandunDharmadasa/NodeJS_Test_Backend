const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    total: {
        type:String,
        required:true
    },

    netTax: {
        type:String,
        required:true
    },

    delivery: {
        type:String,
        required:true
    },

    value: {
        type:String,
        required:true
    },

    cusName: {
        type:String,
        required:true
    },

    address: {
        type:String,
        required:true
    },

    mobile: {
        type:String,
        required:true
    },
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;