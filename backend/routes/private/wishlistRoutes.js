const express = require('express');
const wishlistController = require('../../controllers/wishlistController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);

router
    .route('/')
    .post(wishlistController.createWishlist)

router
    .route('/:id')
    .get( wishlistController.getWishlist)
    .delete( wishlistController.deleteWishlist);


module.exports = router;