const express = require('express');
const productArtistController = require('../../controllers/productArtistController');
const authMiddleware = require('../../middleware/authMiddleware');
const autorizationMiddleware = require('../../middleware/autorizationMiddleware');
const router = express.Router();


router.use(authMiddleware);

router
    .route('/')
    .get(productArtistController.getAll);

router
    .route('/options')
    .get(productArtistController.options);

router
    .route('/:id')
    .get(productArtistController.getById)

router.use(autorizationMiddleware('admin'));

router
    .route('/')
    .post(productArtistController.create)

router
    .route('/:id')
    .patch(productArtistController.update)
    .delete(productArtistController.delete);

module.exports = router;