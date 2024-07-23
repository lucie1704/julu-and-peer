const express = require('express');
const productFormatController = require('../../controllers/productFormatController');
const router = express.Router();
const checkAdmin = require('../../middleware/checkAdmin');

// Public
router
    .route('/')
    .get(productFormatController.getAll);

router
    .route('/options')
    .get(productFormatController.options);

router
    .route('/:id')
    .get(productFormatController.getById)


// Only authentified admin user
router.use(checkAdmin);
    
router
    .route('/')
    .post(productFormatController.create)

router
    .route('/:id')
    .patch(productFormatController.update)
    .delete(productFormatController.delete);

module.exports = router;