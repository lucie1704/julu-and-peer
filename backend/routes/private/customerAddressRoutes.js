const express = require('express');
const customerAddressController = require('../../controllers/customerAddressController');
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
    .post(customerAddressController.createCustomerAddress)
    .get(customerAddressController.getAllCustomerAddresses);

router
    .route('/:id')
    .get(customerAddressController.getCustomerAddressById)
    .patch(customerAddressController.updateCustomerAddress)
    .delete(customerAddressController.deleteCustomerAddress);

router
    .delete('/delete/:id', customerAddressController.deleteCustomerAddress);

module.exports = router;