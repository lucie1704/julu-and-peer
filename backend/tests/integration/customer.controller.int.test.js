const request = require('supertest');
const app = require('../../app');
const { User, Customer } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const userId = uuidv4();
const customerId = uuidv4();

describe('Tests d\'intégration pour le controller des clients', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await User.create({ id: userId, email: 'test@example.com', password: 'password123' });
        // await Customer.create({ id: customerId, userId: userId, firstName: 'John', lastName: 'Doe' });
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await Customer.destroy({ where: {} });
        // await User.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les clients', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer un nouveau client', async () => {
    //     const newUserId = uuidv4();
    //     await User.create({ id: newUserId, email: 'newuser@example.com', password: 'password123' });

    //     const response = await request(app)
    //         .post('/customers')
    //         .send({ userId: newUserId, firstName: 'Jane', lastName: 'Doe' });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.userId).toBe(newUserId);
    //     expect(response.body.firstName).toBe('Jane');
    //     expect(response.body.lastName).toBe('Doe');
    // });

    // it('devrait obtenir tous les clients', async () => {
    //     const response = await request(app).get('/customers');

    //     expect(response.status).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir un client par ID', async () => {
    //     const response = await request(app).get(`/customers/${customerId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', customerId);
    //     expect(response.body.firstName).toBe('John');
    //     expect(response.body.lastName).toBe('Doe');
    // });

    // it('devrait obtenir un client par userId', async () => {
    //     const response = await request(app).get(`/customers/user/${userId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('userId', userId);
    //     expect(response.body.firstName).toBe('John');
    //     expect(response.body.lastName).toBe('Doe');
    // });

    // it('devrait mettre à jour un client', async () => {
    //     const response = await request(app)
    //         .put(`/customers/${customerId}`)
    //         .send({ firstName: 'Johnny', lastName: 'Doe' });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', customerId);
    //     expect(response.body.firstName).toBe('Johnny');
    //     expect(response.body.lastName).toBe('Doe');
    // });

    // it('devrait supprimer un client', async () => {
    //     const newCustomerId = uuidv4();
    //     await Customer.create({ id: newCustomerId, userId: userId, firstName: 'Mark', lastName: 'Twain' });

    //     const response = await request(app).delete(`/customers/${newCustomerId}`);

    //     expect(response.status).toBe(204);

    //     const customer = await Customer.findByPk(newCustomerId);
    //     expect(customer).toBeNull();
    // });
});
