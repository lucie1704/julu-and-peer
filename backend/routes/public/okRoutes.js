const express = require('express');

const router = express.Router();

// Public routes
router.get('/', (req, res) => res.send("OK"));

module.exports = router;