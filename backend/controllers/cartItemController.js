const CartItem = require('../models/cartitem');

exports.getAllCartItems = async (req, res) => {
    try {
        const items = await CartItem.findAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCartItem = async (req, res) => {
    try {
        const item = await CartItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (item) {
            await item.update(req.body);
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (item) {
            await item.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};