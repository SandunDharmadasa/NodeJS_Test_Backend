const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    amount: {
        type:String,
        required:true
    },

    totalPrice: {
        type:String,
        required:true
    }
});

const Cart = mongoose.model('Cart',CartSchema);

module.exports = Cart;