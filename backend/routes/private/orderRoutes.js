const express = require('express');
const orderController = require('../../controllers/customerOrder');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');

// Private
router.use(authMiddleware);

router
    .route('/')
    .post(orderController.create)
    .get(orderController.getAllOrders);

router
    .route('/:id/')
    .get(orderController.getById)

router
    .route('/:id/:status/')
    .get(orderController.getAll);

router.get('/confirm/:id', orderController.orderConfirm)


module.exports = router;