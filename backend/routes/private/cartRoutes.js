const express = require('express');
const cartController = require('../../controllers/cartController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();

// router.use(authMiddleware);

router
    .route('/')
    .post(cartController.create)

router
    .route('/:id')
    .delete(cartController.delete);


// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .get(cartController.getAll);

router
    .route('/:id')
    .get(cartController.getById)
    .patch(cartController.update)


router.get('/customer/:id',cartController.getByCustomerId)

router.get('/products/:id',cartController.getProducts)

module.exports = router;