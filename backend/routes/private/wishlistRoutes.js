const express = require('express');
const wishlistController = require('../../controllers/wishlistController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authMiddleware);

router
    .route('/')
    .post(wishlistController.create)

router
    .route('/:id')
    .get(wishlistController.getAll)
    .delete(wishlistController.delete)
    .patch(wishlistController.update)


module.exports = router;
