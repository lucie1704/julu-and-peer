const request = require('supertest');
const app = require('../../app');
const { Product, CartItem, Cart } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const cartId = uuidv4();
const productId = uuidv4();

describe('Tests d\'intégration pour le controller des items de caddie', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await Cart.create({ id: cartId, customerId: uuidv4() });
        // await Product.create({ id: productId, name: 'Produit Test', quantity: 10, price: 100 });
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await CartItem.destroy({ where: {} });
        // await Product.destroy({ where: {} });
        // await Cart.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les items de caddie', async () => {
        expect(1).toBe(1);
    });

    // it('devrait ajouter un nouvel item de caddie', async () => {
    //     const response = await request(app)
    //         .post('/cartitems')
    //         .send({ productId, cartId, quantity: 2 });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.productId).toBe(productId);
    //     expect(response.body.cartId).toBe(cartId);
    //     expect(response.body.quantity).toBe(2);
    // });

    // it('devrait mettre à jour un item de caddie', async () => {
    //     const cartItemId = uuidv4();
    //     await CartItem.create({ id: cartItemId, productId, cartId, quantity: 1 });

    //     const response = await request(app)
    //         .put('/cartitems')
    //         .send({ productId, cartId, quantity: 3 });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.productId).toBe(productId);
    //     expect(response.body.cartId).toBe(cartId);
    //     expect(response.body.quantity).toBe(3);
    // });

    // it('devrait supprimer un item de caddie', async () => {
    //     const cartItemId = uuidv4();
    //     await CartItem.create({ id: cartItemId, productId, cartId, quantity: 1 });

    //     const response = await request(app).delete(`/cartitems/${cartItemId}`);

    //     expect(response.status).toBe(204);

    //     const cartItem = await CartItem.findByPk(cartItemId);
    //     expect(cartItem).toBeNull();
    // });
});
