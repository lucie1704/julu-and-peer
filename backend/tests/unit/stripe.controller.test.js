const stripeController = require('../../controllers/stripeController');
const stripe = require('../../services/stripe');
const dotenv = require('dotenv');
const AppError = require('../../utils/appError');

dotenv.config({ path: './config.env' });

jest.mock('../../services/stripe', () => ({
    checkout: {
        sessions: {
            create: jest.fn(),
        },
    },
}));

describe('Tests sur le controller Stripe', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer une session de paiement avec Stripe', async () => {
        const req = {
            body: {
                items: [
                    {
                        Product: {
                            name: 'Produit Test',
                            description: 'Description Test',
                            price: 1000,
                        },
                        quantity: 2,
                    },
                ],
                order_datas: { orderId: '12345' },
                shipping_info: { address: '123 Rue Test' },
                billing_info: { card: '**** **** **** 1234' },
                cart_id: 'cart-123',
            },
        };
        const res = {
            json: jest.fn(),
        };

        const session = { id: 'session_12345' };
        stripe.checkout.sessions.create.mockResolvedValue(session);

        await stripeController.create(req, res);

        expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
            payment_method_types: ['card', 'sepa_debit', 'paypal'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Produit Test',
                            description: 'Description Test',
                        },
                        unit_amount: 100000,
                    },
                    quantity: 2,
                },
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Frais de livraison',
                            description: 'Frais de livraison standard',
                        },
                        unit_amount: 18000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                order_datas: JSON.stringify(req.body.order_datas),
                shipping_info: JSON.stringify(req.body.shipping_info),
                billing_info: JSON.stringify(req.body.billing_info),
                cart_id: req.body.cart_id,
            },
            success_url: 'http://localhost:8080',
            cancel_url: 'http://localhost:8080',
        });
        expect(res.json).toHaveBeenCalledWith({ id: session.id });
    });

    it('devrait gérer les erreurs lors de la création de session de paiement', async () => {
        const req = {
            body: {
                items: [
                    {
                        Product: {
                            name: 'Produit Test',
                            description: 'Description Test',
                            price: 1000,
                        },
                        quantity: 2,
                    },
                ],
                order_datas: { orderId: '12345' },
                shipping_info: { address: '123 Rue Test' },
                billing_info: { card: '**** **** **** 1234' },
                cart_id: 'cart-123',
            },
        };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        stripe.checkout.sessions.create.mockRejectedValue(new Error('Stripe error'));

        await stripeController.create(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
});
