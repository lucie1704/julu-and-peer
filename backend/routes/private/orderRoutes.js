const express = require('express');
const orderController = require('../../controllers/customerOrder');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);
router.post('/place-order',orderController.placeOrder)
router.get('/get-orders/:customerId/:status',orderController.getOrders)
router.get('/get-order-details/:orderId',orderController.getOrderDetails)
router.post('/create-payment',orderController.createPayment)
router.get('/confirm-order/:orderId',orderController.orderConfirm)

// Need admin role to get access to these routes
// router.use(autorizationMiddleware('admin'));
router.get('/', orderController.getAllOrders)

module.exports = router;