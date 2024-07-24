const express = require('express');
const newsLetterController = require('../../controllers/newsLetterController');

const router = express.Router();

router.get('/', newsLetterController.newsletter);

module.exports = router;