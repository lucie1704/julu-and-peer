const express = require('express');
const productController = require('../../controllers/productController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


router.use(authMiddleware);

router
    .route('/')
    .get(productController.getAll);

router
    .route('/options')
    .get(productController.options);

router
    .route('/:id')
    .get(productController.getById)

router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productController.create)

router
    .route('/:id')
    .patch(productController.update)
    .patch(productController.update)

module.exports = router;