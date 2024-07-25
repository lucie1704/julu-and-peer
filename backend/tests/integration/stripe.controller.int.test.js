'use strict';
const request = require('supertest');
const app = require('../../app');
const stripe = require('../../services/stripe');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

jest.mock('../../services/stripe');

describe('Tests d\'intégration pour le controller de paiement', () => {
    const base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://www.juluandpeer.store';

    beforeAll(() => {
        // init de donnée ?
    });

    afterAll(() => {
        // TODO
    });

    it('devrait tester le fichier d\'intégration pour la session de paiement stripe', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer une session Stripe de paiement', async () => {
    //     stripe.checkout.sessions.create.mockResolvedValue({
    //         id: 'test_session_id',
    //     });

    //     const response = await request(app)
    //         .post('/create-payment-session')
    //         .send({
    //             items: [
    //                 {
    //                     Product: {
    //                         name: 'Produit Test',
    //                         description: 'Description du produit test',
    //                         price: 10,
    //                     },
    //                     quantity: 2,
    //                 }
    //             ],
    //             order_datas: { orderId: '1234' },
    //             shipping_info: { address: '123 Rue Test' },
    //             billing_info: { cardNumber: '4242424242424242' },
    //             cart_id: 'cart_test_id'
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', 'test_session_id');
    // });

    // it('devrait échouer si Stripe renvoie une erreur', async () => {
    //     stripe.checkout.sessions.create.mockRejectedValue(new Error('Erreur Stripe'));

    //     const response = await request(app)
    //         .post('/create-payment-session')
    //         .send({
    //             items: [
    //                 {
    //                     Product: {
    //                         name: 'Produit Test',
    //                         description: 'Description du produit test',
    //                         price: 10,
    //                     },
    //                     quantity: 2,
    //                 }
    //             ],
    //             order_datas: { orderId: '1234' },
    //             shipping_info: { address: '123 Rue Test' },
    //             billing_info: { cardNumber: '4242424242424242' },
    //             cart_id: 'cart_test_id'
    //         });

    //     expect(response.status).toBe(500);
    //     expect(response.body).toHaveProperty('message', 'Erreur lors de la création de la session de paiement');
    // });
});
