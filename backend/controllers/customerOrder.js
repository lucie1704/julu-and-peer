const {responseReturn} = require('../utils/response');
const { CustomerOrder, Cart, CartItem, Product, Customer} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.createPayment = catchAsyncError(async (req, res, next) => {
  // const { price } = req.body

  //TODO: Use stripe
  // const payment = await stripe.paymentIntents.create({
  //   amount: price * 100,
  //   currency: 'usd',
  //   automatic_payment_methods: {
  //       enabled: true
  //   }
  // })
  // if(!payment) return next(new AppError('Payment faills, try agian !', 404));

  // responseReturn(res, 200, { clientSecret: payment.client_secret })

});

exports.paymentCheck = catchAsyncError (async (id) => {

  const customerOrder = await CustomerOrder.findByPk(id)

  if(!customerOrder) return next(new AppError('Customer order not found', 404));

  let updatedOrder = null;
  if (customerOrder.paymentStatus === 'unpaid') {
    updatedOrder = await customerOrder.update({deliveryStatus: 'cancelled'})
  }

  if(!updatedOrder) return next(new AppError('Error while updating  customer order', 404));

  return true
});

exports.orderConfirm = catchAsyncError(async (req, res, next) => {
  const {orderId} = req.params

  const customerOrder = await CustomerOrder.findByPk(orderId)

  if(!customerOrder) return next(new AppError('Customer order Item not found', 404));

  const updatedOrder = await customerOrder.update({ paymentStatus: 'paid', deliveryStatus : 'pending'})
  if(!updatedOrder) return next(new AppError('Error while updating  customer order', 404));

  responseReturn(res,200, {
    message: 'Success'
  })
});

exports.placeOrder = catchAsyncError(async (req, res, next) => {
  const { shippingFee, products, shippingInfo, customerId } = req.body;

  if (!products || products.length === 0) {
    return next(new AppError('No products provided', 400));
  }

  const customerOrderProducts = products.map(item => ({
    productId: item.id,
    name: item.name,
    description: item.description,
    price: item.price * item.quantity,
    quantity: item.quantity
  }));

  const orderTotalPrice = customerOrderProducts.reduce((acc, item) => acc + item.price, 0) + shippingFee;
 
  const existingOrder = await CustomerOrder.findOne({
    where: {
      customerId,
      deliveryStatus: 'pending',
      paymentStatus: 'unpaid'
    }
  });

  if (existingOrder) {
    const allProductsFound = customerOrderProducts.every(product => {
      return existingOrder.products.some(orderProduct => orderProduct.id === product.id);
      });

    if (allProductsFound) return next(new AppError('Order already exists with the same products:', 404));
  }

  const order = await CustomerOrder.create({
    customerId,
    shippingInfo,
    products: customerOrderProducts,
    price: orderTotalPrice,
    paymentStatus: 'unpaid',
    deliveryStatus: 'pending',
    date: new Date()
  });

  if (!order) {
    return next(new AppError('Error while creating order', 404));
  }

  setTimeout(() => {
    exports.paymentCheck(order.id, next);
  }, 15000);

  responseReturn(res, 200, { message: "Order Placed Successfully", orderId: order.id });
});

exports.getOrders = catchAsyncError(async (req, res, next) => {
  const { customerId, status } = req.params;

  let orders;

  if (status !== 'all') {
      orders = await CustomerOrder.findAll({
          where: {
              customerId,
              deliveryStatus: status
          }
      });
  } else {
      orders = await CustomerOrder.findAll({
          where: {
              customerId
          }
      });
  }

  if (!orders.length) {
      return next(new AppError('No orders found', 404));
  }

  responseReturn(res, 200, {
      orders
  });
});

exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
  const {orderId} = req.params

  const order = await CustomerOrder.findByPk(orderId)

  if(!order) return next(new AppError('Customer order not found', 404));

  responseReturn(res,200, {
    order
  })
});

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const { count, rows } = await CustomerOrder.findAndCountAll({
      limit,
      offset,
      include: [
          { model: Customer }
      ]
  });
  const totalPages = Math.ceil(count / limit);

  if(!rows) return next(new AppError('Error : fails to fetch products', 404));

  res.status(200).json({
      page,
      limit,
      totalItems: count,
      totalPages,
      data: rows
  });

  // TODO: Make This part work according to Zod schema.
  // const products = await OrderMongo.find()
  // .skip(offset)
  // .limit(limit)
  // .exec();
  // const totalItems = await OrderMongo.countDocuments().exec();
  // const totalPages = Math.ceil(totalItems / limit);

  // if(!products) return next(new AppError('Error : fails to fetch orders', 404));

  // return responseReturn(res, 200, {
  //     page,
  //     limit,
  //     totalItems,
  //     totalPages,
  //     data: products,
  // });
});

