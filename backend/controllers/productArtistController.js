const { Product, ProductArtist } = require('../models');

exports.getAllProductArtists = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    try {
        const { count, rows } = await ProductArtist.findAndCountAll({
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

exports.getProductArtistById = async (req, res) => {
    try {
        const artist = await ProductArtist.findByPk(req.params.id);
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json();
    }
};

exports.createProductArtist = async (req, res) => {
    try {
        const artist = await ProductArtist.create(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json();
    }
};

exports.updateProductArtist = async (req, res) => {
    try {
        const artist = await ProductArtist.findByPk(req.params.id);

        if (!artist) res.status(404).json();

        await artist.update(req.body);

        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json();
    }
};

exports.deleteProductArtist = async (req, res) => {
    try {
        const artist = await ProductArtist.findByPk(req.params.id);
        if (!artist) {  
            return res.status(404).json();
        }
        const productsCount = await Product.count({ where: { artistId: artist.id } });

        // On check si il y a un produit associé, si ce n'est pas le cas on peut le supprimer.
        if (productsCount > 0) {
            return res.status(400).json({ message: 'Vous ne pouvez pas supprimer un artiste qui est encore associé a des produits.' });
        }
        await artist.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message: "An error occured while trying to delete Artist",
            details: error.message
        });
    }
};

exports.getProductArtistOptions = async (req, res) => {
    try {
        const newItem = {
            name: '',
            description: ''
        };

        res.status(200).json({
            newItem
        });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la tentative de récupération de données." });
    }
};