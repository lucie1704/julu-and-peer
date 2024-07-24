const express = require('express');
const productArtistController = require('../../controllers/productArtistController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const checkAdmin = require('../../middleware/checkAdmin');

// Public
router
    .route('/')
    .get(productArtistController.getAll);

router
    .route('/options')
    .get(productArtistController.options);

router
    .route('/:id')
    .get(productArtistController.getById)

// Only authentified admin user
router.use(checkAdmin);

router
    .route('/')
    .post(productArtistController.create)

router
    .route('/:id')
    .patch(productArtistController.update)
    .delete(productArtistController.delete);

module.exports = router;