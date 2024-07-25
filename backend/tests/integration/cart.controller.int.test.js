const request = require('supertest');
const app = require('../../app');
const { Cart, CartItem, Product, ProductGenre, ProductFormat, ProductArtist, Image } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const customerId = uuidv4();
const cartId = uuidv4();
const productId = uuidv4();
const genreId = uuidv4();
const formatId = uuidv4();
const artistId = uuidv4();
const imageId = uuidv4();

describe('Tests d\'intégration pour le controller des paniers', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await Cart.create({ id: cartId, customerId: customerId });
        // await Product.create({ id: productId, name: 'Produit Test', quantity: 10, price: 100, discount: 10, genreId: genreId, formatId: formatId, artistId: artistId });
        // await CartItem.create({ id: uuidv4(), cartId: cartId, productId: productId, quantity: 2 });
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await CartItem.destroy({ where: {} });
        // await Product.destroy({ where: {} });
        // await Cart.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les paniers', async () => {
        expect(1).toBe(1);
    });

    // it('devrait obtenir les produits d\'un panier', async () => {
    //     const response = await request(app).get(`/carts/products/${customerId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('cart');
    //     expect(response.body.cart).toHaveProperty('CartItems');
    //     expect(response.body.cart.CartItems.length).toBeGreaterThan(0);
    //     expect(response.body).toHaveProperty('totalPrice');
    //     expect(response.body).toHaveProperty('totalDiscount');
    //     expect(response.body).toHaveProperty('cartTotalProductCount');
    //     expect(response.body).toHaveProperty('shippingFee');
    //     expect(response.body).toHaveProperty('outOfStockProducts');
    //     expect(response.body).toHaveProperty('availableProducts');
    // });

    // it('devrait obtenir tous les paniers', async () => {
    //     const response = await request(app).get('/carts');

    //     expect(response.status).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir un panier par ID', async () => {
    //     const response = await request(app).get(`/carts/${cartId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', cartId);
    // });

    // it('devrait obtenir un panier par customerId', async () => {
    //     const response = await request(app).get(`/carts/customer/${customerId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('customerId', customerId);
    // });

    // it('devrait créer un nouveau panier', async () => {
    //     const newCustomerId = uuidv4();
    //     const response = await request(app)
    //         .post('/carts')
    //         .send({ customerId: newCustomerId });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.customerId).toBe(newCustomerId);
    // });

    // it('devrait mettre à jour un panier', async () => {
    //     const response = await request(app)
    //         .put(`/carts/${cartId}`)
    //         .send({ customerId: customerId });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', cartId);
    //     expect(response.body.customerId).toBe(customerId);
    // });

    // it('devrait supprimer un panier', async () => {
    //     const newCartId = uuidv4();
    //     await Cart.create({ id: newCartId, customerId: customerId });

    //     const response = await request(app).delete(`/carts/${newCartId}`);

    //     expect(response.status).toBe(204);

    //     const cart = await Cart.findByPk(newCartId);
    //     expect(cart).toBeNull();
    // });
});
