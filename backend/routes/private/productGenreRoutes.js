const express = require('express');
const productGenreController = require('../../controllers/productGenreController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


router.use(authMiddleware);

router
    .route('/')
    .get(productGenreController.getAll);

router
    .route('/options')
    .get(productGenreController.options);

router
    .route('/:id')
    .get(productGenreController.getById)

router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productGenreController.create)


router
    .route('/:id')
    .patch(productGenreController.update)
    .delete(productGenreController.delete);


module.exports = router;