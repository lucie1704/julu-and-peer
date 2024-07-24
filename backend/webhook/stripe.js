const { Cart, CustomerAddress, CustomerOrder, Shipping, PaymentMethod, Stock, OrderBilling } = require('../models');
const stripe = require('../services/stripe');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const signature_token = process.env.NODE_ENV === 'development' ? process.env.STRIPE_LOCAL_WH_TOKEN : process.env.STRIPE_PROD_WH_TOKEN;


const webhookStripeHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, signature_token);
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send();
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;

            // Generate random fake tracking number
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let trackingNumber = '';
            for (let i = 0; i < 13; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                trackingNumber += characters[randomIndex];
            }

            // Get all necessary datas for orders
            const cartId = checkoutSessionCompleted.metadata.cart_id;
            const orderDatas = JSON.parse(checkoutSessionCompleted.metadata.order_datas);
            const shippingInfo = JSON.parse(checkoutSessionCompleted.metadata.shipping_info);
            const billingInfo = JSON.parse(checkoutSessionCompleted.metadata.billing_info);

            // CUSTOMERADDRESS
            async function findOrCreateAddress(addressInfo, addressType) {
                let address = await CustomerAddress.findOne({
                    where: {
                        customerId: orderDatas.customerId,
                        addressType: addressType,
                        addressLine1: addressInfo.address,
                        addressLine2: addressInfo.apartment,
                        city: addressInfo.city,
                        postalCode: addressInfo.postalCode,
                        country: addressInfo.country,
                        phoneNumber: addressInfo.phone
                    }
                });

                if (!address) {
                    address = await CustomerAddress.create({
                        customerId: orderDatas.customerId,
                        addressType: addressType,
                        addressLine1: addressInfo.address,
                        addressLine2: addressInfo.apartment,
                        city: addressInfo.city,
                        postalCode: addressInfo.postalCode,
                        country: addressInfo.country,
                        phoneNumber: addressInfo.phone
                    });
                }

                return address;
            }

            const billingAddress = await findOrCreateAddress(billingInfo, 'billing');
            const shippingAddress = await findOrCreateAddress(shippingInfo, 'shipping');

            // PAYMENTMETHOD
            const paymentMethod = await PaymentMethod.create({
                type: 'stripe',
                cardHolderName: 'fake',
                cardExpireDate: new Date(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 12), 1),
                cardNumber: '****',
                cvv: '***',
                billingAddressId: await billingAddress.id
            });

            // ORDERBILLING
            const newOrderBilling = await OrderBilling.create({
                paymentMethodId: paymentMethod.id,
                link: 'stripe' // TODO: Add receipt from stripe
            });

            // SHIPPING
            const shipping = await Shipping.create({
                trackNumber: trackingNumber,
                shippingDate: new Date(),
                receiptDate: null,
                status: 'pending'
            });

            // CUSTOMER ORDER
            const totalPrice = orderDatas.products.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0);
            const newCustomerOrder = await CustomerOrder.create({
                products: orderDatas.products,
                price: totalPrice,
                paymentStatus: 'paid',
                shippingInfo: JSON.stringify(shippingInfo),
                billingInfo: JSON.stringify(billingInfo),
                deliveryStatus: 'pending',
                date: new Date(),
                customerId: orderDatas.customerId,
                customerAddressId: shippingAddress.id,
                orderBillingId: newOrderBilling.id,
                shippingId: shipping.id
            });

            // CREATE MINUS STOCK FOR EACH PRODUCTS
            for (const product of orderDatas.products) {
                await Stock.create({
                    type: 'minus',
                    productId: product.id,
                    quantity: product.quantity,
                    orderId: newCustomerOrder.id
                });
            }
            
            // Delete Cart Finally
            await Cart.destroy({
                where: {
                    id: cartId
                },
            });
            break;
        default:
            console.log(`Unhandled stripe webhook event type ${event.type}`);
    }

    // Return received True for Stripe.
    res.json({received: true});
};

module.exports = webhookStripeHandler;