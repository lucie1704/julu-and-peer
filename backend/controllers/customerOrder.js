const {responseReturn} = require('../utils/response');
const { CustomerOrder, Cart, CartItem, Product} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.paymentCheck = catchAsyncError (async (id) => {

  const customerOrder = await CustomerOrder.findByPk(id)

  if(!customerOrder) return next(new AppError(404));

  let updatedOrder = null;
  if (customerOrder.paymentStatus === 'unpaid') {
    updatedOrder = await customerOrder.update({deliveryStatus: 'cancelled'})
  }

  if(!updatedOrder) return next(new AppError(404));

  return true
});

exports.orderConfirm = catchAsyncError(async (req, res, next) => {
  const {id} = req.params

  const customerOrder = await CustomerOrder.findByPk(id)

  if(!customerOrder) return next(new AppError(404));

  const updatedOrder = await customerOrder.update({ paymentStatus: 'paid', deliveryStatus : 'pending'})
  if(!updatedOrder) return next(new AppError(404));

  res.status(200)
});

exports.create = catchAsyncError(async (req, res, next) => {
  const { shippingFee, products, shippingInfo, customerId } = req.body;

  if (!products || products.length === 0) {
    return next(new AppError(404));
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

    if (allProductsFound) return next(new AppError(409));
  }

  // TODO: Update customerAddresse
  
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
    return next(new AppError(404));
  }

  setTimeout(() => {
    exports.paymentCheck(order.id, next);
  }, 15000);

  res.status(200)
});

exports.getAll = catchAsyncError(async (req, res, next) => {
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
      return next(new AppError(404));
  }

  responseReturn(res, orders);
});

exports.getById = catchAsyncError(async (req, res, next) => {
  const {orderId} = req.params

  const order = await CustomerOrder.findByPk(orderId)

  if(!order) return next(new AppError(404));

  responseReturn(res, order)
});

