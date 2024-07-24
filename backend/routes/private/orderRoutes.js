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
    .get(orderController.getAll);

router
    .route('/options')
    .get(orderController.options);

router
    .route('/:id')
    .get(orderController.getById)

router.get('/confirm/:id', orderController.orderConfirm)

router
    .route('/')
    .get(orderController.getAll);


module.exports = router;