const mongoose = require('mongoose');
const logger = require('../../utils/logger');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => logger.info('MongoDB connection successful!'));

module.exports = mongoose;
