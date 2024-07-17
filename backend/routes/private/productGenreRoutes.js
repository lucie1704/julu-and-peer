const express = require('express');
const productGenreController = require('../../controllers/productGenreController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// router.use(authMiddleware);
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productGenreController.create)
    .get(productGenreController.getAll);

router
    .route('/:id')
    .get(productGenreController.getById)
    .patch(productGenreController.update)
    .delete(productGenreController.delete);

module.exports = router;