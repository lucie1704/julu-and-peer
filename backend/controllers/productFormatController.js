const productFormat = require('../models/productformat');

exports.getAllProductFormats = async (req, res) => {
    try {
        const formats = await productFormat.getAllProductFormats();
        res.status(200).json(formats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductFormatById = async (req, res) => {
    try {
        const format = await productFormat.getProductFormatById(req.params.id);
        if (format) {
            res.status(200).json(format);
        } else {
            res.status(404).json({ message: 'Format not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProductFormat = async (req, res) => {
    try {
        const format = await productFormat.createProductFormat(req.body);
        res.status(201).json(format);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductFormat = async (req, res) => {
    try {
        const format = await productFormat.updateProductFormat(req.params.id, req.body);
        if (format) {
            res.status(200).json(format);
        } else {
            res.status(404).json({ message: 'Format not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProductFormat = async (req, res) => {
    try {
        const success = await productFormat.deleteProductFormat(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Format not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};