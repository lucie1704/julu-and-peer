const app = require('./app');
const mongoose = require('mongoose');

//Server port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});