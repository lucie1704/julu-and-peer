const {responseReturn} = require('../utils/response');
const { Product, CartItem} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const { v4: uuidv4 } = require('uuid');

exports.add = catchAsyncError (async (req, res, next) => {
    const id = uuidv4();
    const {productId, cartId, quantity } = req.body;

    // Find the product
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return next(new AppError('Product not found', 404));

    // Check if the cart item already exists
    const existingCartItem = await CartItem.findOne({
        where: { productId, cartId }
    });

    if (existingCartItem) {
        // If it exists, update the quantity
        existingCartItem.quantity = quantity;
        await existingCartItem.save();

        return responseReturn(res, existingCartItem, 200);
    } else {
        // If it doesn't exist, create a new cart item
        const newCartItem = await CartItem.create({
            id,
            productId,
            cartId,
            quantity,
        });

        return responseReturn(res, newCartItem, 201);
    }
});

exports.update = catchAsyncError(async (req, res, next) => {

    const { productId, cartId, quantity } = req.body;

    // Find the product
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return next(new AppError('Product not found', 404));

    // Check if the cart item already exists
    const existingCartItem = await CartItem.findOne({
        where: { productId, cartId }
    });

    if (existingCartItem) {
        // If it exists, update the quantity
        existingCartItem.quantity = quantity;
        await existingCartItem.save();

        return responseReturn(res, existingCartItem, 200);
    } else {
        // If it doesn't exist, create a new cart item
        const newCartItem = await CartItem.create({
            productId,
            cartId,
            quantity,
        });

        return responseReturn(res, newCartItem, 201);
    }
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await CartItem.destroy({
        where: {
            id: req.params.id
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204).send()
});


