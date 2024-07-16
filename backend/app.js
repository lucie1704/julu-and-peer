const express = require('express');
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
const cartRouter = require('./routes/private/cartRoutes');
const cartItemRouter = require('./routes/private/cartItemRoutes');
const wishlistRouter = require('./routes/private/wishlistRoutes');
const orderRouter = require('./routes/private/orderRoutes');
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

require("./models/mongo/db");

// Start express app
const app = express();

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

// Apply CSRF protection middleware
// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

// Protects against HTTP Parameter Pollution (HPP) attacks by removing duplicate query parameters
app.use(hpp());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

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

// Public
app.use('/api/v1/auth', authRouter);

// Private
app.use('/api/v1/users', userRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/customersaddress', customerAddressRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/productartists', productArtistRouter);
app.use('/api/v1/productformats', productFormatRouter);
app.use('/api/v1/productgenres', productGenreRouter);
app.use('/api/v1/productcustomerevaluations', productCustomerEvaluationRouter);
app.use('/api/v1/paymentmethods', paymentMethodRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/cartitem', cartItemRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/customerorder', orderRouter);

// Handle requests for routes that are not defined in the application.
app.all('*', (req, res, next) => {
  next(new AppError(404));
});

app.use(globalErrorHandler);

module.exports = app;