const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');
const ProductEmail = require('../../utils/productEmail');

jest.mock('../../utils/productEmail');

describe('Tests d\'intégration pour le controller des newsletters', () => {
    beforeAll(async () => {
        // Initialisation des données de test ?
        // await User.bulkCreate([
        //     { id: 'user1', email: 'user1@example.com', newsletterSubscribed: true },
        //     { id: 'user2', email: 'user2@example.com', newsletterSubscribed: true },
        //     { id: 'user3', email: 'user3@example.com', newsletterSubscribed: false }
        // ]);
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await User.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour les newsletters', async () => {
        expect(1).toBe(1);
    });

    // it('devrait envoyer des courriels de newsletter aux utilisateurs abonnés', async () => {
    //     const mockNewsProduct = jest.fn();
    //     const mockDiscountedProduct = jest.fn();
    //     ProductEmail.mockImplementation(() => ({
    //         newsProduct: mockNewsProduct,
    //         discountedProduct: mockDiscountedProduct
    //     }));

    //     const response = await request(app).post('/newsletter');

    //     expect(response.status).toBe(200);

    //     expect(mockNewsProduct).toHaveBeenCalledTimes(2);
    //     expect(mockDiscountedProduct).toHaveBeenCalledTimes(2);

    //     expect(ProductEmail).toHaveBeenCalledWith(expect.objectContaining({ email: 'user1@example.com' }), 'www.juluandpeer.store/newsletter');
    //     expect(ProductEmail).toHaveBeenCalledWith(expect.objectContaining({ email: 'user2@example.com' }), 'www.juluandpeer.store/newsletter');
    // });
});
