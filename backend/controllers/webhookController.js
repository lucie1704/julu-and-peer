// const { CustomerOrder } = require('../models');
// const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
// const filterObject = require('../utils/filterObject');
// const { responseReturn } = require('../utils/response');


exports.stripe = catchAsyncError(async (req, res, next) => {
    // TODO : Handle Event Webhook Stripe
    const event = req.body;

  // Handle the event
    switch (event.type) {
        case 'payment_intent.canceled':
            const paymentIntentCanceled = event.data.object;
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            break;
        // TODO: Save Payment Method ?
        // case 'payment_method.attached':
        //     const paymentMethod = event.data.object;
        //     break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return received True for Stripe.
    res.json({received: true});
});