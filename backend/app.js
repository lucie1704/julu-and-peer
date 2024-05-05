const express = require('express');

// Start express app
const app = express();

// ROUTES
app.use('/', (req, res, next) => {
  console.log('Hello World');
});

module.exports = app;