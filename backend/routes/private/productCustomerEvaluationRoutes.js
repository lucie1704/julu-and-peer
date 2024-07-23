const express = require('express');
const productCustomerEvaluationController = require('../../controllers/productCustomerEvaluationController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// Private
router.use(authMiddleware);

router
    .route('/')
    .post(productCustomerEvaluationController.create)

router
    .route('/:id')
    .get(productCustomerEvaluationController.getById)
    .patch(productCustomerEvaluationController.update)
    .delete(productCustomerEvaluationController.delete);

// Admin
router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(productCustomerEvaluationController.getAll);

router
    .route('/:id')
    .delete(productCustomerEvaluationController.delete);

module.exports = router;