const express = require('express');
const okRouter = require('./routes/public/okRoutes');
const authRouter = require('./routes/public/authRoutes');
const userRouter = require('./routes/private/userRoutes');
const customerRouter = require('./routes/private/customerRoutes');
const customerAddressRouter = require('./routes/private/customerAddressRoutes');
const productRouter = require('./routes/private/productRoutes');
const productArtistRouter = require('./routes/private/productArtistRoutes');
const productFormatRouter = require('./routes/private/productFormatRoutes');
const productGenreRouter = require('./routes/private/productGenreRoutes');
const productCustomerEvaluationRouter = require('./routes/private/productCustomerEvaluationRoutes');
const paymentMethodRouter = require('./routes/private/paymentMethodRoutes');
const stripeRouter = require('./routes/private/stripeRoutes');
const cartRouter = require('./routes/private/cartRoutes');
const cartItemRouter = require('./routes/private/cartItemRoutes');
const wishlistRouter = require('./routes/private/wishlistRoutes');
const orderRouter = require('./routes/private/orderRoutes');
const newsLettersRoutes = require('./routes/public/newsLettersRoutes');
const AppError = require('./utils/appError');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./utils/logger');
const initDeliveryCronJob = require("./cron/delivery");
const webhookStripeHandler = require("./webhook/stripe");
const bodyParser = require('body-parser');

require("./models/mongo/db");

// Start express app
const app = express();

// Webhook for Stripe
app.post(
  "/webhook/stripe",
  bodyParser.raw({ type: "application/json" }),
  webhookStripeHandler
);

//Set env variable globally
dotenv.config({ path: './config.env' });

// const csurf = require('csurf');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Parses URL-encoded request bodies,
app.use(express.urlencoded({ extended: true, limit:'1kb'}));

// Parses cookies attached to incoming requests. Required for CSRF protection it allows the CSRF token to be stored and accessed in cookies.
app.use(cookieParser());

// Enable CORS for all routes in developpment
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

const corsOptions = {
  origin: [
    'https://www.juluandpeer.store', 
    'http://www.juluandpeer.store', 
    'https://juluandpeer.store', 
    'http://juluandpeer.store'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

if (process.env.NODE_ENV !== 'development') {
  app.use(cors());
}
  // app.use(cors(corsOptions));

//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://www.juluandpeer.store');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

// Apply CSRF protection middleware
// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

// Protects against HTTP Parameter Pollution (HPP) attacks by removing duplicate query parameters
app.use(hpp());

// Set security HTTP headers
app.use(helmet());

//Data sanictization against xss
app.use(xss());

// Make CSRF token available to the view layer

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Set the view engine to use Pug for rendering templates
app.set('view engine', 'pug');

// Set the directory where the views/templates are located using by pug
app.set('views', path.join(__dirname, 'views'));

// ROUTE TEST
app.use('/helloworld', async (req, res, next) => {
  logger.info('Hello world');
});

// API Routes
app.use('/api', okRouter);
app.use('/api/auth', authRouter);

// Private
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/customersaddress', customerAddressRouter);
app.use('/api/products', productRouter);
app.use('/api/productartists', productArtistRouter);
app.use('/api/productformats', productFormatRouter);
app.use('/api/productgenres', productGenreRouter);
app.use('/api/productcustomerevaluations', productCustomerEvaluationRouter);
app.use('/api/paymentmethods', paymentMethodRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/carts', cartRouter);
app.use('/api/cartitem', cartItemRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/customerorder', orderRouter);
app.use('/api/newsletter', newsLettersRoutes);

// Handle requests for routes that are not defined in the application.
app.all('*', (req, res, next) => {
  next(new AppError(404));
});

app.use(globalErrorHandler);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
  },
});

app.use(limiter);

// Init the cron job for delivery
initDeliveryCronJob();

module.exports = app;