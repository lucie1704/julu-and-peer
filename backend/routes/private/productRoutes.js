const express = require('express');
const productController = require('../../controllers/productController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const checkAdmin = require('../../middleware/checkAdmin');

// Public
router
    .route('/')
    .get(productController.getAll);

router
    .route('/options')
    .get(productController.options);

router
    .route('/:id')
    .get(productController.getById)


// Only authentified admin user
router.use(checkAdmin);

router
    .route('/')
    .post(productController.create)

router
    .route('/:id')
    .patch(productController.update)
    .delete(productController.delete)


module.exports = router;