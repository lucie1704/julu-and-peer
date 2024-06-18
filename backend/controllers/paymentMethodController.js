const PaymentMethod = require('../models/paymentmethod');

exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.findAll();
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (paymentMethod) {
            res.status(200).json(paymentMethod);
        } else {
            res.status(404).json({ message: 'Payment Method not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.create(req.body);
        res.status(201).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (paymentMethod) {
            await paymentMethod.update(req.body);
            res.status(200).json(paymentMethod);
        } else {
            res.status(404).json({ message: 'Payment Method not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (paymentMethod) {
            await paymentMethod.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Payment Method not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};