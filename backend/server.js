const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Server port
const port = process.env.PORT || 3000;

//MonngoDB connection
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log('MongoDB connection successful!'));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});