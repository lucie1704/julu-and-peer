const express = require('express');
const productController = require('../../controllers/productController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// router.use(authMiddleware);
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productController.create)
    .get(productController.getAll);

router
    .route('/:id')
    .get(productController.getById)
    .patch(productController.update)
    .delete(productController.delete);

module.exports = router;