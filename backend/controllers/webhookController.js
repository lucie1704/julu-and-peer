// const { CustomerOrder } = require('../models');
// const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
// const filterObject = require('../utils/filterObject');
// const { responseReturn } = require('../utils/response');


exports.stripe = catchAsyncError(async (req, res, next) => {
    // TODO : Rajouter les events sur le vrai webhook api.
    // TODO : Handle Event Webhook Stripe
    const event = req.body;

    // checkout.session.completed

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            break;
        // TODO: Save Payment Method ?
        // case 'payment_method.attached':
        //     const paymentMethod = event.data.object;
        //     break;
        // ... handle other event types
        default:
            console.log(`Unhandled stripe webhook event type ${event.type}`);
    }

    // Return received True for Stripe.
    res.json({received: true});
});