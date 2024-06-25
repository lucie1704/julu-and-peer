const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

//Server port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`App running on port ${port}...`);
});