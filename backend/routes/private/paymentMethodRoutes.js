const express = require('express');
const paymentMethodController = require('../../controllers/paymentMethodController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// router.use(authMiddleware);
router
    .route('/')
    .post(paymentMethodController.create)


// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(paymentMethodController.getAll);

router
    .route('/:id')
    .get(paymentMethodController.getById)
    .patch(paymentMethodController.update)
    .delete(paymentMethodController.delete);

module.exports = router;