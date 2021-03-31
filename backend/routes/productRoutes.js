const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controller/productController')

// Get all products from DB
// @route GET /api/products
// @access Public
router.get('/products', getAllProducts)


// router.get('/products', getProducts);
router.post('/products', createProduct);

router.put('/products/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


router.get('/products', getAllProducts)

// Get a product by id from DB
// @route GET /api/products/:id
// @access Public
router.get('/products/:id', getProductById);

module.exports = router;