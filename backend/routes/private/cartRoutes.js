const express = require('express');
const cartController = require('../../controllers/cartController');
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
    .post(cartController.createCart)
    .get(cartController.getAllCarts);

router
    .route('/:id')
    .get(cartController.getCartById)
    .patch(cartController.updateCart)
    .delete(cartController.deleteCart);

router.get('/getcartsproducts/:customerId',cartController.getCartsProducts)

router
    .delete('/delete/:id', cartController.deleteCart);

module.exports = router;