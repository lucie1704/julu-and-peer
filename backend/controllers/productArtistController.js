const productArtist = require('../models/productartist');

exports.getAllProductArtists = async (req, res) => {
    try {
        const artists = await productArtist.getAllProductArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductArtistById = async (req, res) => {
    try {
        const artist = await productArtist.getProductArtistById(req.params.id);
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProductArtist = async (req, res) => {
    try {
        const artist = await productArtist.createProductArtist(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductArtist = async (req, res) => {
    try {
        const artist = await productArtist.updateProductArtist(req.params.id, req.body);
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProductArtist = async (req, res) => {
    try {
        const success = await productArtist.deleteProductArtist(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};