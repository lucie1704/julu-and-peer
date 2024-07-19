const express = require('express');
const productCustomerEvaluationController = require('../../controllers/productCustomerEvaluationController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// router.use(authMiddleware);

router
    .route('/')
    .post(productCustomerEvaluationController.create)

    router
    .route('/:id')
    .get(productCustomerEvaluationController.getById)
    .patch(productCustomerEvaluationController.update)
    .delete(productCustomerEvaluationController.delete);

// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(productCustomerEvaluationController.getAll);

module.exports = router;