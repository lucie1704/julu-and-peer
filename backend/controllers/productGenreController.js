const productGenre = require('../models/productgenre');

exports.getAllProductGenres = async (req, res) => {
    try {
        const genres = await productGenre.getAllProductGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductGenreById = async (req, res) => {
    try {
        const genre = await productGenre.getProductGenreById(req.params.id);
        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProductGenre = async (req, res) => {
    try {
        const genre = await productGenre.createProductGenre(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductGenre = async (req, res) => {
    try {
        const genre = await productGenre.updateProductGenre(req.params.id, req.body);
        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProductGenre = async (req, res) => {
    try {
        const success = await productGenre.deleteProductGenre(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};