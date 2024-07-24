const express = require('express');
const productGenreController = require('../../controllers/productGenreController');
const authMiddleware = require('../../middleware/authMiddleware');
const checkAdmin = require('../../middleware/checkAdmin');

const router = express.Router();

// Public
router
    .route('/')
    .get(productGenreController.getAll);

router
    .route('/options')
    .get(productGenreController.options);

router
    .route('/:id')
    .get(productGenreController.getById)


// Only authentified admin user
router.use(checkAdmin);

router
    .route('/')
    .post(productGenreController.create)

router
    .route('/:id')
    .patch(productGenreController.update)
    .delete(productGenreController.delete);


module.exports = router;