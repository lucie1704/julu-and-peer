const {responseReturn} = require('../utils/response');
const { Product, CartItem} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.add = catchAsyncError (async (req, res, next) => {
    const {productId, cartId, quantity } = req.body;

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) return next(new AppError(404));

    const cartItem = await CartItem.create({
        productId,
        cartId,
        quantity,
    });

    return responseReturn(res, cartItem, 201);

});

exports.update = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) return next(new AppError(404));

    const updatedCartItem = await cartItem.update({ quantity: req.body.quantity });

    if (!updatedCartItem) return next(new AppError(404));

    await updatedCartItem.save();

    responseReturn(res, updatedCartItem.quantity );
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await CartItem.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204)
});


