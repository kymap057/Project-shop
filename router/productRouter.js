const express = require('express');
const router = express.Router()
const productController = require('../controller/productController')

router.get('/',productController.getAllProduct);
router.post('/',productController.createProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router;