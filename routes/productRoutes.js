const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts)
router.get('/:_id', getProduct);
router.put('/:_id', updateProduct);
router.delete('/:_id', deleteProduct);

module.exports = router;
