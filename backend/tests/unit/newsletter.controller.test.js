const newsletterController = require('../../controllers/newsLetterController');
const { User } = require('../../models');
const ProductEmail = require('../../utils/productEmail');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    User: {
        findAll: jest.fn(),
    },
}));

jest.mock('../../utils/productEmail');

describe('Tests sur le controller des newsletters', () => {
    let res, next;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('devrait envoyer la newsletter à tous les utilisateurs abonnés', async () => {
        const users = [
            { id: 'user1', email: 'user1@example.com', newsletterSubscribed: true },
            { id: 'user2', email: 'user2@example.com', newsletterSubscribed: true },
        ];

        User.findAll.mockResolvedValue(users);

        ProductEmail.mockImplementation(() => ({
            newsProduct: jest.fn().mockResolvedValue(),
            discountedProduct: jest.fn().mockResolvedValue(),
        }));

        await newsletterController.newsletter({}, res, next);

        expect(User.findAll).toHaveBeenCalledWith({ where: { newsletterSubscribed: true } });
        expect(ProductEmail).toHaveBeenCalledTimes(users.length);
        users.forEach((user, index) => {
            expect(ProductEmail).toHaveBeenNthCalledWith(index + 1, user, 'www.juluandpeer.store/newsletter');
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Newsletter sent successfully' });
    });

    it('devrait renvoyer une erreur si aucun utilisateur abonné n\'est trouvé', async () => {
        User.findAll.mockResolvedValue([]);

        await newsletterController.newsletter({}, res, next);

        expect(User.findAll).toHaveBeenCalledWith({ where: { newsletterSubscribed: true } });
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].statusCode).toBe(404);
        expect(next.mock.calls[0][0].message).toBe('No subscribed users found');
    });

    it('devrait gérer les erreurs lors de l\'envoi de la newsletter', async () => {
        const users = [
            { id: 'user1', email: 'user1@example.com', newsletterSubscribed: true },
            { id: 'user2', email: 'user2@example.com', newsletterSubscribed: true },
        ];

        User.findAll.mockResolvedValue(users);

        ProductEmail.mockImplementation(() => ({
            newsProduct: jest.fn().mockRejectedValue(new Error('Failed to send news product email')),
            discountedProduct: jest.fn().mockResolvedValue(),
        }));

        await newsletterController.newsletter({}, res, next);

        expect(User.findAll).toHaveBeenCalledWith({ where: { newsletterSubscribed: true } });
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next.mock.calls[0][0].message).toBe('Failed to send news product email');
    });
});