const express = require('express');
const cartItemController = require('../../controllers/cartItemController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);
router
    .route('/')
    .post(cartItemController.createCartItem)

router
    .route('/quantity-inc/:id')
    .put(cartItemController.cartItemQuantityInc)

router
    .route('/quantity-dec/:id')
    .put(cartItemController.cartItemQuantityDec)

router
    .delete('/delete/:id', cartItemController.deleteCartItem);

module.exports = router;