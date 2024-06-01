const express = require('express');
const cartItemController = require('../../controllers/cartItemController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// Protect all routes after this middleware
router.use(authMiddleware);

// Here do other routes

//Need admin role to get access to these routes
router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(cartItemController.createCartItem)
    .get(cartItemController.getAllCartItems);

router
    .route('/:id')
    .get(cartItemController.getCartItemById)
    .patch(cartItemController.updateCartItem)
    .delete(cartItemController.deleteCartItem);

router
    .delete('/delete/:id', cartItemController.deleteCartItem);

module.exports = router;