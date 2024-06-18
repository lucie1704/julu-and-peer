const express = require('express');
const customerController = require('../../controllers/customerController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// Protect all routes after this middleware
router.use(authMiddleware);

// TODO: Define if we use this route to update User parent or delete this part

//Need admin role to get access to these routes
router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(customerController.getCustomers)
    .post(customerController.createCustomer);

router
    .route('/:id')
    .get(customerController.getCustomerById)
    .patch(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

router
    .delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;