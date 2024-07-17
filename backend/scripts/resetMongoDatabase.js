const mongoose = require('mongoose');

// On supprime toutes les collections dans la base de données
async function dropDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection to database for reset...');
        console.log('Trying to drop the database...');
        await mongoose.connection.db.dropDatabase();
        console.log('The Mongo database has been reset successfully');
    } catch (error) {
        console.error('Error while trying to reset Mongo database :', error);
    } finally {
        mongoose.connection.close();
        console.log('Connection to database closed !');
    }
}

dropDatabase();