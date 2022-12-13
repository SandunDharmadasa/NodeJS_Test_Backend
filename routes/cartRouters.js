const express = require('express');
const router = express.Router();

const{addToCart,
    getCart,
    editCart,
    deleteCart,
    deleteAll
} = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/get', getCart);
router.put('/update/:id', editCart);
router.delete('/delete/:id', deleteCart);
router.delete('/delete', deleteAll);

module.exports = router;