const express = require('express');
const productGenreController = require('../../controllers/productGenreController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);

// Here do other routes

//Need admin role to get access to these routes
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productGenreController.createProductGenre)
    .get(productGenreController.getAllProductGenres);

router
    .route('/:id')
    .get(productGenreController.getProductGenreById)
    .patch(productGenreController.updateProductGenre)
    .delete(productGenreController.deleteProductGenre);

module.exports = router;