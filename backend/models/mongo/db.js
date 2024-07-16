const mongoose = require('mongoose');
const logger = require('../../utils/logger');
const dotenv = require('dotenv');

if(process.env.NODE_ENV === 'staging'){
  dotenv.config({ path: `./.env.staging` });
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => logger.info('MongoDB connection successful!'));

module.exports = mongoose;
