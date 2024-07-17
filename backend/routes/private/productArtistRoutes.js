const express = require('express');
const productArtistController = require('../../controllers/productArtistController');
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
    .post(productArtistController.createProductArtist)
    .get(productArtistController.getAllProductArtists);

router
    .route('/:id')
    .get(productArtistController.getProductArtistById)
    .patch(productArtistController.updateProductArtist)
    .delete(productArtistController.deleteProductArtist);

module.exports = router;