const { Cart, CartItem, Product, ProductGenre, ProductFormat,ProductArtist} = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');

exports.getCartsProducts = catchAsyncError(async (req, res, next) => {
    const { customerId } = req.params;

    const cart = await Cart.findOne({
        where: { customerId },
        include: {
            model: CartItem,
            include: {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'availableStock', 'discount'],
                include: [
                    { model: ProductGenre },
                    { model: ProductFormat },
                    { model: ProductArtist }
                ]
            }
        }
    });

    if (!cart) return next(new AppError('Cart not found', 404));

    let totalPrice = 0;
    let totalDiscount = 0;
    const outOfStockProducts = [];

    const buyProductCartItem = cart.CartItems.filter(cartItem => {
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

    responseReturn(res, 200, {
        cart,
        totalPrice,
        totalDiscount,
        cartTotalProductCount,
        shippingFee,
        outOfStockProducts,
        buyProductCartItem
    });
});

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCart = async (req, res, next) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            await cart.update(req.body);
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            await cart.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};