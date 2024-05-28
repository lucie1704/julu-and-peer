const express = require('express');
const productCustomerEvaluationController = require('../controllers/productCustomerEvaluationController');
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
    .post(productCustomerEvaluationController.createProductCustomerEvaluation)
    .get(productCustomerEvaluationController.getAllProductCustomerEvaluations);

router
    .route('/:id')
    .get(productCustomerEvaluationController.getProductCustomerEvaluationById)
    .patch(productCustomerEvaluationController.updateProductCustomerEvaluation)
    .delete(productCustomerEvaluationController.deleteProductCustomerEvaluation);

router
    .delete('/softdelete/:id', productCustomerEvaluationController.softDelete);

module.exports = router;