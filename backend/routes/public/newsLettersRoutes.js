const express = require('express');
const newLetterController = require('../../controllers/newLetterController');

const router = express.Router();

router.get('/', newLetterController.newsletter);

module.exports = router;