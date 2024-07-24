const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');
const stripe = require('../services/stripe');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://juluandpeer.store';

exports.create = catchAsyncError(async (req, res) => {
    const { items, order_datas, shipping_info, billing_info, cart_id } = req.body;

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
        metadata: {
            order_datas: JSON.stringify(order_datas),
            shipping_info: JSON.stringify(shipping_info),
            billing_info: JSON.stringify(billing_info),
            cart_id: cart_id,
        },
        success_url: `${base_url}`,
        cancel_url: `${base_url}`,
    });

    res.json({ id: session.id });
});