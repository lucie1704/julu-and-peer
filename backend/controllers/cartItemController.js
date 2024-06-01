const {responseReturn} = require('../utils/response');
const { Product, CartItem} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.createCartItem = catchAsyncError (async (req, res, next) => {
    const {productId, cartId, quantity } = req.body;
     // Check if the product exists and is available
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) return next(new AppError('Product not found', 404));

     // Check if the product is already in the cart
    const existingCartItem = await CartItem.findOne({
        where: {
            productId,
            cartId,
        }
    });

    if (existingCartItem) return next(new AppError('Product already added to cart', 400));

     // Add the product to the cart
    const cartItem = await CartItem.create({
        productId,
        cartId,
        quantity,
    });

    return responseReturn(res, 201, { message: "Added to cart successfully", cartItem });

});

exports.cartItemQuantityInc = catchAsyncError(async (req, res, next) => {
    const {id } = req.params

    const cartItem = await CartItem.findByPk(id);

    if(!cartItem) return next(new AppError('Cart Item not found', 404));

    const {quantity} = cartItem;
    //TODO: Check before if product is not outOfStockProduct, send message "Product out of stock"
    const updatedCartItem = await cartItem.update({quantity: quantity + 1 })
    
    if(!updatedCartItem) return next(new AppError('Error while increasing  cart item quantity', 404));

    await updatedCartItem.save();

    responseReturn(res,200,{message: "Quantity Updated", quantity: updatedCartItem.quantity })
});

exports.cartItemQuantityDec = catchAsyncError(async (req, res, next) => {
    const {id } = req.params

    const cartItem = await CartItem.findByPk(id);

    if(!cartItem) return next(new AppError('Cart Item not found', 404));

    const {quantity} = cartItem;
    //TODO: Check before if product is not outOfStockProduct, send message "Product out of stock"
    const updatedCartItem = await cartItem.update({quantity: quantity - 1 })
    
    if(!updatedCartItem) return next(new AppError('Error while decreasing cart item quantity', 404));

    await updatedCartItem.save();

    responseReturn(res,200,{message: "Quantity Updated", quantity: updatedCartItem.quantity })
});

exports.deleteCartItem = catchAsyncError(async (req, res) => {

    const cartItem = await CartItem.findByPk(req.params.id);

    if(!cartItem) return next(new AppError('Cart Item not found', 404));

    await cartItem.destroy();

    responseReturn(res,200,{message: "Cart-item Remove Successfully" })

});


