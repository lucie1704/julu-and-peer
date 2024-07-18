const express = require('express');
const productArtistController = require('../../controllers/productArtistController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


// router.use(authMiddleware);
// router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productArtistController.create)
    .get(productArtistController.getAll);

router
    .route('/:id')
    .get(productArtistController.getById)
    .patch(productArtistController.update)
    .delete(productArtistController.delete);


module.exports = router;