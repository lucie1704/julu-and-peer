const express = require('express');
const webhookController = require('../../controllers/webhookController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router
    .route('/stripe')
    .post(webhookController.stripe)

module.exports = router;