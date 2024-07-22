const express = require('express');
const productFormatController = require('../../controllers/productFormatController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


router.use(authMiddleware);

router
    .route('/')
    .get(productFormatController.getAll);

router
    .route('/options')
    .get(productFormatController.options);

router
    .route('/:id')
    .get(productFormatController.getById)

router.use(autorizationMiddleware('admin'));
    
router
    .route('/')
    .post(productFormatController.create)

router
    .route('/:id')
    .patch(productFormatController.update)
    .delete(productFormatController.delete);

module.exports = router;