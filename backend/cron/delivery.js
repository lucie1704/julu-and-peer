const cron = require('node-cron');

const initDeliveryCronJob = () => {
    console.log('Initialisation de la cron tab pour les livraisons.');

    cron.schedule('*/5 * * * *', async () => {
        console.log('Changements des status de livraisons (5 minutes)');
        // TODO: Changer les status de livraisons.
    });
};

module.exports = initDeliveryCronJob;
