const express = require('express');
const customerAddressController = require('../../controllers/customerAddressController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// router.use(authMiddleware);

router
    .route('/')
    .post(customerAddressController.create)

router
    .route('/:id')
    .get(customerAddressController.getById)
    .patch(customerAddressController.update)
    .delete(customerAddressController.delete);
    

// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(customerAddressController.getAll);


module.exports = router;