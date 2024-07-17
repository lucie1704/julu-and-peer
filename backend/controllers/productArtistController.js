const { ProductArtist } = require('../models');

exports.getAllProductArtists = async (req, res) => {
    try {
        const artists = await ProductArtist.findAll();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json();
    }
};

exports.getProductArtistById = async (req, res) => {
    try {
        const artist = await ProductArtist.getProductArtistById(req.params.id);
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
        const artist = await ProductArtist.createProductArtist(req.body);
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
            return res.status(400).json({ message: 'Cannot delete artist with associated products' });
        }
        await artist.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json();
    }
};