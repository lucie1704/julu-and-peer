const express = require('express');
const orderController = require('../../controllers/customerOrder');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');

router.use(authMiddleware);

router
    .route('/')
    .post(orderController.create)
    .get(orderController.getAll);

router
    .route('/:id')
    .get(orderController.getById)

router.get('/confirm/:id', orderController.orderConfirm)

router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(orderController.getAll);


module.exports = router;