const express = require('express');
const productFormatController = require('../../controllers/productFormatController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);

// Here do other routes

//Need admin role to get access to these routes
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productFormatController.createProductFormat)
    .get(productFormatController.getAllProductFormats);

router
    .route('/options')
    .get(productFormatController.getProductFormatOptions);

router
    .route('/:id')
    .get(productFormatController.getProductFormatById)
    .patch(productFormatController.updateProductFormat)
    .delete(productFormatController.deleteProductFormat);

module.exports = router;