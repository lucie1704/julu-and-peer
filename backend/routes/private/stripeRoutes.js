const express = require('express');
const stripeController = require('../../controllers/stripeController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// router.use(authMiddleware);

router
    .route('/')
    .post(stripeController.create)

module.exports = router;