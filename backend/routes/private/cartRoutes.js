const express = require('express');
const cartController = require('../../controllers/cartController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// Public
router
    .route('/')
    .post(cartController.create)
    .get(cartController.getAll);

router
    .route('/:id')
    .get(cartController.getById)
    .patch(cartController.update)
    .delete(cartController.delete);

router.get('/customer/:id',cartController.getByCustomerId)
router.get('/products/:id',cartController.getProducts)


router
    .route('/')
    .get(cartController.getAll);

module.exports = router;