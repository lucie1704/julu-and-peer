const request = require('supertest');
const app = require('../../app');
const { Customer, CustomerOrder, CustomerAddress } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const customerId = uuidv4();
const orderId = uuidv4();
const addressId = uuidv4();

describe('Tests d\'intégration pour le controller des commandes clients', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await Customer.create({ id: customerId, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        // await CustomerAddress.create({ id: addressId, customerId: customerId, address: '123 Main St', city: 'Test City', postalCode: '12345', country: 'Test Country' });
        // await CustomerOrder.create({
        //     id: orderId,
        //     customerId: customerId,
        //     shippingInfo: 'Test Shipping Info',
        //     products: [{ productId: 'product1', name: 'Product 1', description: 'Description 1', price: 100, quantity: 2 }],
        //     price: 200,
        //     paymentStatus: 'unpaid',
        //     deliveryStatus: 'pending',
        //     date: new Date()
        // });
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await CustomerOrder.destroy({ where: {} });
        // await CustomerAddress.destroy({ where: {} });
        // await Customer.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les commandes clients', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer une nouvelle commande client', async () => {
    //     const newOrderId = uuidv4();

    //     const response = await request(app)
    //         .post('/customer-orders')
    //         .send({
    //             id: newOrderId,
    //             customerId: customerId,
    //             shippingInfo: '456 Another St',
    //             products: [{ id: 'product2', name: 'Product 2', description: 'Description 2', price: 150, quantity: 1 }],
    //             shippingFee: 20
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', newOrderId);
    //     expect(response.body.customerId).toBe(customerId);
    //     expect(response.body.shippingInfo).toBe('456 Another St');
    // });

    // it('devrait confirmer une commande client', async () => {
    //     const response = await request(app)
    //         .put(`/customer-orders/${orderId}/confirm`);

    //     expect(response.status).toBe(200);

    //     const order = await CustomerOrder.findByPk(orderId);
    //     expect(order.paymentStatus).toBe('paid');
    //     expect(order.deliveryStatus).toBe('pending');
    // });

    // it('devrait obtenir toutes les commandes d\'un client', async () => {
    //     const response = await request(app).get(`/customer-orders/${customerId}/all`);

    //     expect(response.status).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir une commande par ID', async () => {
    //     const response = await request(app).get(`/customer-orders/${orderId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', orderId);
    // });

    // it('devrait obtenir toutes les commandes (admin)', async () => {
    //     const response = await request(app).get('/customer-orders/all');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body.data.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir les adresses de livraison d\'un client', async () => {
    //     const response = await request(app)
    //         .get('/customer-orders/options')
    //         .set('Authorization', `Bearer ${customerId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('adress');
    //     expect(response.body.adress.length).toBeGreaterThan(0);
    // });
});
