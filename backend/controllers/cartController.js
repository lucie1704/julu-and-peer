const { Cart, CartItem, Product, ProductGenre, ProductFormat,ProductArtist} = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');

exports.getProducts = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const cart = await Cart.findOne({
        where: { customerId : id},
        include: {
            model: CartItem,
            include: {
                model: Product,
                include: [
                    { model: ProductGenre },
                    { model: ProductFormat },
                    { model: ProductArtist }
                ]
            }
        }
    });

    if (!cart) return next(new AppError(404));

    let totalPrice = 0;
    let totalDiscount = 0;
    const outOfStockProducts = [];

    const availableProducts = cart.CartItems.filter(cartItem => {
        const product = cartItem.Product;
        if (product.availableStock >= cartItem.quantity) {
          totalPrice += product.price * cartItem.quantity;
          totalDiscount += product.discount * cartItem.quantity;
          return true;
        } else {
          outOfStockProductIds.push(product.id);
          return false;
        }
    });

    const cartTotalProductCount = cart.CartItems.length;
    const shippingFee = 50;

    responseReturn(res, {
        cart,
        totalPrice,
        totalDiscount,
        cartTotalProductCount,
        shippingFee,
        outOfStockProducts,
        availableProducts
    });
});

exports.getAll = catchAsyncError (async (req, res) => {

    const carts = await Cart.findAll();

    if (!carts) return next(new AppError(404));

    responseReturn(res, carts);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const cart = await Cart.findByPk(req.params.id)
    if (!cart) return next(new AppError(404));
    return responseReturn(res, cart);
});

exports.getByCustomerId = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const cart = await Cart.findOne({ where: { customerId: id } });
    if (!cart) return next(new AppError(404));
    return responseReturn(res, cart);
});

exports.create = catchAsyncError(async (req, res, next) => {
    const { customerId } = req.body;

    const existedCart = await Cart.findOne({ where: { customerId } });

    if (existedCart) return next(new AppError(409));

    const cart = await Cart.create({ customerId });

    if (!cart) return next(new AppError(404));

    return responseReturn(res, cart, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, carts] = await Cart.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, carts[0]);
});

exports.delete = catchAsyncError(async( req, res, next) => {
    const result = await Cart.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204)
});