const express = require('express');
const paymentMethodController = require('../../controllers/paymentMethodController');
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
    .post(paymentMethodController.createPaymentMethod)
    .get(paymentMethodController.getAllPaymentMethods);

router
    .route('/:id')
    .get(paymentMethodController.getPaymentMethodById)
    .patch(paymentMethodController.updatePaymentMethod)
    .delete(paymentMethodController.deletePaymentMethod);

module.exports = router;