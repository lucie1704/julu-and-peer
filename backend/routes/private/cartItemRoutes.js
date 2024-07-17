const express = require('express');
const cartItemController = require('../../controllers/cartItemController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// router.use(authMiddleware);

router
    .route('/')
    .post(cartItemController.add)

router
    .route('/:id')
    .patch(cartItemController.update)
    .delete(cartItemController.delete);

module.exports = router;