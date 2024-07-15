const ProductArtist = require('../models/productartist');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAllProductArtists = catchAsyncError(async (req, res) => {
    const artists = await ProductArtist.findAll();
    responseReturn(res, artists);
});

exports.getProductArtistById = catchAsyncError(async (req, res, next) => {

    const artist = await ProductArtist.findByPk(req.params.id);
    
    if (!artist) return next(new AppError(404));

    responseReturn(res, artist);
});

exports.createProductArtist = catchAsyncError(async (req, res) => {

    const artist = await ProductArtist.create(req.body);
    
    responseReturn(res, artist, 201);
});

exports.updateProductArtist = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, artists] = await ProductArtist.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, artists[0]);
});

exports.deleteProductArtist = catchAsyncError(async (req, res, next) => {
    const result = await ProductArtist.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
});