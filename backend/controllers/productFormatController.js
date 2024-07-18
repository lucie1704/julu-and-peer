const { Product, ProductFormat } = require('../models');

exports.getAllProductFormats = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    try {
        const { count, rows } = await ProductFormat.findAndCountAll({
            limit,
            offset,
        });
        const totalPages = Math.ceil(count / limit);
        res.status(200).json({
            page,
            limit,
            totalItems: count,
            totalPages,
            data: rows
        });
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
        const format = await ProductFormat.create(data);
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
            return res.status(400).json({ message: 'Vous ne pouvez pas supprimer un format qui est encore associé a des produits.' });
        }
        await format.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message: "An error occured while trying to delete Format",
            details: error.message
        });
    }
};