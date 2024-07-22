const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');
const stripe = require('../services/stripe');

exports.create = catchAsyncError(async (req, res) => {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            'card',
            'sepa_debit',
            'paypal'
        ],
        line_items: [
            ...items.map(item => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.Product.name,
                        description: item.Product.description
                    },
                    unit_amount: item.Product.price * 100,
                },
                quantity: item.quantity,
            })),
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Frais de livraison',
                        description: 'Frais de livraison standard'
                    },
                    unit_amount: 180,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080?paid=success',
        cancel_url: 'http://localhost:8080?paid=cancel',
    });

    res.json({ id: session.id });
});