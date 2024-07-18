const express = require('express');
const productFormatController = require('../../controllers/productFormatController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// router.use(authMiddleware);
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productFormatController.create)
    .get(productFormatController.getAll);

router
    .route('/:id')
    .get(productFormatController.getById)
    .patch(productFormatController.update)
    .delete(productFormatController.delete);

module.exports = router;