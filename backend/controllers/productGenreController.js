const { Product, ProductGenre } = require('../models');

exports.getAllProductGenres = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    try {
        const { count, rows } = await ProductGenre.findAndCountAll({
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

exports.getProductGenreById = async (req, res) => {
    try {
        const genre = await ProductGenre.getProductGenreById(req.params.id);
        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json();
    }
};

exports.createProductGenre = async (req, res) => {
    try {
        const genre = await ProductGenre.createProductGenre(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json();
    }
};

exports.updateProductGenre = async (req, res) => {
    try {
        const genre = await ProductGenre.findByPk(req.params.id);

        if (!genre) res.status(404).json();

        await genre.update(req.body);

        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json();
    }
};

exports.deleteProductGenre = async (req, res) => {
    try {
        const genre = await ProductGenre.findByPk(req.params.id);
        if (!genre) {  
            return res.status(404).json();
        }
        const productsCount = await Product.count({ where: { genreId: genre.id } });

        // On check si il y a un produit associé, si ce n'est pas le cas on peut le supprimer.
        if (productsCount > 0) {
            return res.status(400).json({ message: 'Vous ne pouvez pas supprimer un genre qui est encore associé a des produits.' });
        }
        await genre.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message: "An error occured while trying to delete Genre",
            details: error.message
        });
    }
};