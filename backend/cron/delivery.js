const { Shipping } = require('../models');
const cron = require('node-cron');

const initDeliveryCronJob = () => {
    console.log('Initialisation de la cron tab pour les livraisons.');

    cron.schedule('*/5 * * * *', async () => {
        console.log('Changements des status de livraisons (5 minutes)');
        try {

            const onDeliveryUpdateResult = await Shipping.update(
                { status: 'delivered' },
                {
                    where: {
                        status: 'on delivery'
                    }
                }
            );
            console.log(`Livraisons en on delivery mises à jour à delivered : ${onDeliveryUpdateResult[0]} livraisons.`);

            const pendingUpdateResult = await Shipping.update(
                { status: 'on delivery' },
                {
                    where: {
                        status: 'pending'
                    }
                }
            );
            console.log(`Livraisons en pending mises à jour à on delivery : ${pendingUpdateResult[0]} livraisons.`);
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour des statuts de livraison:', error);
        }
    });
};

module.exports = initDeliveryCronJob;
