const { ProductFormat } = require('../models');

exports.getAllProductFormats = async (req, res) => {
    try {
        const formats = await ProductFormat.findAll();
        res.status(200).json(formats);
    } catch (error) {
        res.status(500).json();
    }
};

exports.getProductFormatById = async (req, res) => {
    try {
        const format = await ProductFormat.getProductFormatById(req.params.id);
        if (format) {
            res.status(200).json(format);
        } else {
            res.status(404).json({ message: 'Format not found' });
        }
    } catch (error) {
        res.status(500).json();
    }
};

exports.createProductFormat = async (req, res) => {
    try {
        const format = await ProductFormat.createProductFormat(req.body);
        res.status(201).json(format);
    } catch (error) {
        res.status(500).json();
    }
};

exports.updateProductFormat = async (req, res) => {
    try {
        const format = await ProductFormat.findByPk(req.params.id);

        if (!format) res.status(404).json();

        await format.update(req.body);

        res.status(200).json(format);
    } catch (error) {
        res.status(500).json();
    }
};

exports.deleteProductFormat = async (req, res) => {
    try {
        const format = await ProductFormat.findByPk(req.params.id);
        if (!format) {  
            return res.status(404).json();
        }
        const productsCount = await Product.count({ where: { formatId: format.id } });

        // On check si il y a un produit associé, si ce n'est pas le cas on peut le supprimer.
        if (productsCount > 0) {
            return res.status(400).json({ message: 'Cannot delete format with associated products' });
        }
        await format.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json();
    }
};