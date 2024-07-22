const express = require('express');
const orderController = require('../../controllers/customerOrder');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// router.use(authMiddleware);

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

// Need admin role to get access to these routes
// router.use(autorizationMiddleware('admin'));
// TODO : Use Another Route for Admin Crud
// router.get('/', orderController.getAllOrders)

module.exports = router;