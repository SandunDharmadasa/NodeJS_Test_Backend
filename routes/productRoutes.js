const express = require('express');
const router = express.Router();

const{addProduct,
    getProducts
} = require('../controllers/productController');

router.post('/add', addProduct);
router.get('/get', getProducts);

module.exports = router;