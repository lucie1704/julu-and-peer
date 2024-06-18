const express = require('express');
const cartItemController = require('../../controllers/cartItemController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);
router
    .route('/')
    .post(cartItemController.addToCartItem)

router
    .route('/:id')
    .patch(cartItemController.cartItemQuantityUpdate)
    .delete(cartItemController.deleteCartItem);

module.exports = router;