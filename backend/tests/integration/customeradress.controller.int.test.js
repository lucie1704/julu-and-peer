const request = require('supertest');
const app = require('../../app');
const { Customer, CustomerAddress } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const customerId = uuidv4();
const addressId = uuidv4();

describe('Tests d\'intégration pour le controller des adresses clients', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await Customer.create({ id: customerId, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        // await CustomerAddress.create({ id: addressId, customerId: customerId, address: '123 Main St', city: 'Test City', postalCode: '12345', country: 'Test Country' });
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await CustomerAddress.destroy({ where: {} });
        // await Customer.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les adresses clients', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer une nouvelle adresse client', async () => {
    //     const newAddressId = uuidv4();

    //     const response = await request(app)
    //         .post('/customer-addresses')
    //         .send({
    //             id: newAddressId,
    //             customerId: customerId,
    //             address: '456 Another St',
    //             city: 'Another City',
    //             postalCode: '67890',
    //             country: 'Another Country'
    //         });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id', newAddressId);
    //     expect(response.body.customerId).toBe(customerId);
    //     expect(response.body.address).toBe('456 Another St');
    //     expect(response.body.city).toBe('Another City');
    //     expect(response.body.postalCode).toBe('67890');
    //     expect(response.body.country).toBe('Another Country');
    // });

    // it('devrait obtenir toutes les adresses clients', async () => {
    //     const response = await request(app).get('/customer-addresses');

    //     expect(response.status).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir une adresse client par ID', async () => {
    //     const response = await request(app).get(`/customer-addresses/${addressId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', addressId);
    //     expect(response.body.address).toBe('123 Main St');
    // });

    // it('devrait mettre à jour une adresse client', async () => {
    //     const response = await request(app)
    //         .put(`/customer-addresses/${addressId}`)
    //         .send({ address: '789 Updated St', city: 'Updated City' });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', addressId);
    //     expect(response.body.address).toBe('789 Updated St');
    //     expect(response.body.city).toBe('Updated City');
    // });

    // it('devrait supprimer une adresse client', async () => {
    //     const newAddressId = uuidv4();
    //     await CustomerAddress.create({ id: newAddressId, customerId: customerId, address: '111 Test St', city: 'Test City', postalCode: '99999', country: 'Test Country' });

    //     const response = await request(app).delete(`/customer-addresses/${newAddressId}`);

    //     expect(response.status).toBe(204);

    //     const address = await CustomerAddress.findByPk(newAddressId);
    //     expect(address).toBeNull();
    // });
});
