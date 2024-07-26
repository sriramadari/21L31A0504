const express = require('express');
const productController = require('../controllers/productController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/categories/:categoryname/products', authMiddleware, productController.getProducts);
router.get('/categories/:categoryname/products/:productid', authMiddleware, productController.getProductById);


module.exports = router;