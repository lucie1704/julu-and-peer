const {responseReturn} = require('../utils/response');
const { Product, CartItem} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.addToCartItem = catchAsyncError (async (req, res, next) => {
    const {productId, cartId, quantity } = req.body;

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) return next(new AppError('Product not found', 404));

    const existingCartItem = await CartItem.findOne({
        where: {
            productId,
            cartId,
        }
    });

    const cartItem = await CartItem.create({
        productId,
        cartId,
        quantity,
    });

    return responseReturn(res, 201, cartItem);

});

exports.cartItemQuantityUpdate = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) return next(new AppError('Cart Item not found', 404));

    const updatedCartItem = await cartItem.update({ quantity: req.body.quantity });

    if (!updatedCartItem) return next(new AppError('Error while updating cart item quantity', 404));

    await updatedCartItem.save();

    responseReturn(res, 200, updatedCartItem.quantity );
});

exports.deleteCartItem = catchAsyncError(async (req, res) => {

    const cartItem = await CartItem.findByPk(req.params.id);

    if(!cartItem) return next(new AppError('Cart Item not found', 404));

    await cartItem.destroy();
    responseReturn(res,204)
});


