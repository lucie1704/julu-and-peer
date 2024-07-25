'use strict';
const request = require('supertest');
const app = require('../../app'); // Assurez-vous que ce chemin est correct
const { ProductCustomerEvaluation } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const evaluationId = uuidv4();

describe('Tests d\'intégration pour le controller des évaluations produit client', () => {
    beforeAll(async () => {
        // Init de donnée ? 
        // await ProductCustomerEvaluation.sync({ force: true });
    });

    afterAll(async () => {
        // Nettoyage de la base de données après tous les tests
        // await ProductCustomerEvaluation.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les évaluations produit client', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer une nouvelle évaluation', async () => {
    //     const response = await request(app)
    //         .post('/product-customer-evaluations')
    //         .send({
    //             id: evaluationId,
    //             productId: uuidv4(),
    //             customerId: uuidv4(),
    //             rating: 5,
    //             comment: 'Excellent produit!',
    //         });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.productId).toBeTruthy();
    //     expect(response.body.customerId).toBeTruthy();
    //     expect(response.body.rating).toBe(5);
    //     expect(response.body.comment).toBe('Excellent produit!');
    // });

    // it('devrait obtenir toutes les évaluations', async () => {
    //     await ProductCustomerEvaluation.create({
    //         id: uuidv4(),
    //         productId: uuidv4(),
    //         customerId: uuidv4(),
    //         rating: 4,
    //         comment: 'Bon produit',
    //     });
    //     await ProductCustomerEvaluation.create({
    //         id: uuidv4(),
    //         productId: uuidv4(),
    //         customerId: uuidv4(),
    //         rating: 2,
    //         comment: 'Produit décevant',
    //     });

    //     const response = await request(app).get('/product-customer-evaluations');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body.data.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir une évaluation par ID', async () => {
    //     const evaluation = await ProductCustomerEvaluation.create({
    //         id: evaluationId,
    //         productId: uuidv4(),
    //         customerId: uuidv4(),
    //         rating: 3,
    //         comment: 'Produit moyen',
    //     });

    //     const response = await request(app).get(`/product-customer-evaluations/${evaluationId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', evaluationId);
    //     expect(response.body.productId).toBe(evaluation.productId);
    //     expect(response.body.customerId).toBe(evaluation.customerId);
    //     expect(response.body.rating).toBe(3);
    //     expect(response.body.comment).toBe('Produit moyen');
    // });

    // it('devrait mettre à jour une évaluation', async () => {
    //     await ProductCustomerEvaluation.create({
    //         id: evaluationId,
    //         productId: uuidv4(),
    //         customerId: uuidv4(),
    //         rating: 1,
    //         comment: 'Très mauvais produit',
    //     });

    //     const response = await request(app)
    //         .put(`/product-customer-evaluations/${evaluationId}`)
    //         .send({
    //             rating: 5,
    //             comment: 'Produit excellent maintenant',
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', evaluationId);
    //     expect(response.body.rating).toBe(5);
    //     expect(response.body.comment).toBe('Produit excellent maintenant');
    // });

    // it('devrait supprimer une évaluation', async () => {
    //     await ProductCustomerEvaluation.create({
    //         id: evaluationId,
    //         productId: uuidv4(),
    //         customerId: uuidv4(),
    //         rating: 1,
    //         comment: 'À supprimer',
    //     });

    //     const response = await request(app).delete(`/product-customer-evaluations/${evaluationId}`);

    //     expect(response.status).toBe(204);

    //     const evaluation = await ProductCustomerEvaluation.findByPk(evaluationId);
    //     expect(evaluation).toBeNull();
    // });

    // it('ne devrait pas supprimer une évaluation si l\'ID n\'existe pas', async () => {
    //     const response = await request(app).delete(`/product-customer-evaluations/${evaluationId}`);

    //     expect(response.status).toBe(404);
    // });
});
