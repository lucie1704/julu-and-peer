const express = require('express');
const customerController = require('../../controllers/customerController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// router.use(authMiddleware);

router
    .route('/:id')
    .get(customerController.getById)
    .patch(customerController.update)
    .delete(customerController.delete);

router
    .route('/user/:id')
    .get(customerController.getByUserId)

// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(customerController.getAll)
    .post(customerController.create);

module.exports = router;