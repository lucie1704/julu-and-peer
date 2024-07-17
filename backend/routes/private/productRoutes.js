const express = require('express');
const productController = require('../../controllers/productController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);

// Here do other routes

// Need admin role to get access to these routes
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productController.createProduct)
    .get(productController.getAllProducts);

router
    .route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;