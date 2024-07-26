const { Product, ProductArtist } = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getAll = catchAsyncError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    const { count, rows } = await ProductArtist.findAndCountAll({
        limit,
        offset,
    });
    const totalPages = Math.ceil(count / limit);

    responseReturn(res, {
        page,
        limit,
        totalItems: count,
        totalPages,
        data: rows
    })
});

exports.getById = catchAsyncError(async (req, res, next) => {

    const artist = await ProductArtist.findByPk(req.params.id);
    
    if (!artist) return next(new AppError(404));

    responseReturn(res, artist);
});

exports.create = catchAsyncError(async (req, res) => {
    const id = uuidv4();
    const artist = await ProductArtist.create({id, ...req.body});
    
    responseReturn(res, artist, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, artists] = await ProductArtist.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        individualHooks: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, artists[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const artist = await ProductArtist.findByPk(req.params.id);
    
    if (!artist) return next(new AppError(404));

    const productsCount = await Product.count({ where: { artistId: artist.id } });

    // On check si il y a un produit associé, si ce n'est pas le cas on peut le supprimer.
    if (productsCount > 0) {
        return res.status(400).json({ message: 'Vous ne pouvez pas supprimer un artiste qui est encore associé a des produits.' });
    };

    await artist.destroy();
    res.status(204).json()
});

exports.options = catchAsyncError(async (req, res, next) => {
    const newItem = {
        name: '',
        description: ''
    };

    responseReturn(res, newItem)
});