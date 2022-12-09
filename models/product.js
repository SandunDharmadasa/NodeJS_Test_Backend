const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    qty: {
        type:String,
        required:true
    },

    price: {
        type:String,
        required:true
    }
});

const Products = mongoose.model('Products',ProductSchema);

module.exports = Products;