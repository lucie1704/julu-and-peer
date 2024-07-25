'use strict';
const request = require('supertest');
const app = require('../../app');
const { Wishlist } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const testWishlistId = uuidv4();

describe('Tests d\'intégration pour le controller des wishlists', () => {
    beforeAll(async () => {
        // Init de donnée ?
    });

    afterAll(async () => {
        // Nettoyage de la base de données après tous les tests
        // await Wishlist.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour la wishlist', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer une nouvelle wishlist', async () => {
    //     const response = await request(app)
    //         .post('/wishlists')
    //         .send({
    //             slug: 'unique-slug',
    //             productId: 'product-id-123',
    //             customerId: 'customer-id-456'
    //         });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.slug).toBe('unique-slug');
    //     expect(response.body.productId).toBe('product-id-123');
    // });

    // it('devrait échouer si la wishlist existe déjà', async () => {
    //     await Wishlist.create({
    //         id: testWishlistId,
    //         slug: 'existing-slug',
    //         productId: 'product-id-123',
    //         customerId: 'customer-id-456'
    //     });

    //     const response = await request(app)
    //         .post('/wishlists')
    //         .send({
    //             slug: 'existing-slug',
    //             productId: 'product-id-123',
    //             customerId: 'customer-id-456'
    //         });

    //     expect(response.status).toBe(409);
    //     expect(response.body).toHaveProperty('message', 'Conflict');
    // });

    // it('devrait obtenir toutes les wishlists d\'un client', async () => {
    //     await Wishlist.create({
    //         id: testWishlistId,
    //         slug: 'another-slug',
    //         productId: 'product-id-789',
    //         customerId: 'customer-id-456'
    //     });

    //     const response = await request(app)
    //         .get('/wishlists/customer-id-456');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('wishlistCount');
    //     expect(response.body.wishlistCount).toBeGreaterThan(0);
    // });

    // it('devrait obtenir une wishlist par ID', async () => {
    //     const wishlist = await Wishlist.create({
    //         id: testWishlistId,
    //         slug: 'specific-slug',
    //         productId: 'product-id-999',
    //         customerId: 'customer-id-456'
    //     });

    //     const response = await request(app)
    //         .get(`/wishlists/${testWishlistId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', testWishlistId);
    //     expect(response.body.slug).toBe('specific-slug');
    //     expect(response.body.productId).toBe('product-id-999');
    // });

    // it('devrait mettre à jour une wishlist', async () => {
    //     const wishlist = await Wishlist.create({
    //         id: testWishlistId,
    //         slug: 'update-slug',
    //         productId: 'product-id-1000',
    //         customerId: 'customer-id-456'
    //     });

    //     const response = await request(app)
    //         .put(`/wishlists/${testWishlistId}`)
    //         .send({
    //             slug: 'updated-slug',
    //             productId: 'product-id-1001'
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', testWishlistId);
    //     expect(response.body.slug).toBe('updated-slug');
    //     expect(response.body.productId).toBe('product-id-1001');
    // });

    // it('devrait supprimer une wishlist', async () => {
    //     const wishlist = await Wishlist.create({
    //         id: testWishlistId,
    //         slug: 'delete-slug',
    //         productId: 'product-id-1002',
    //         customerId: 'customer-id-456'
    //     });

    //     const response = await request(app)
    //         .delete(`/wishlists/${testWishlistId}`);

    //     expect(response.status).toBe(204);

    //     const deletedWishlist = await Wishlist.findByPk(testWishlistId);
    //     expect(deletedWishlist).toBeNull();
    // });

    // it('ne devrait pas supprimer une wishlist si l\'ID est invalide', async () => {
    //     const response = await request(app)
    //         .delete(`/wishlists/invalid-id`);

    //     expect(response.status).toBe(404);
    //     expect(response.body).toHaveProperty('message', 'Not Found');
    // });
});
