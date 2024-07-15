const ProductGenre = require('../models/productgenre');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAllProductGenres = catchAsyncError(async (req, res) => {
    const genres = await ProductGenre.findAll();

    responseReturn(res, genres);
});

exports.getProductGenreById = catchAsyncError(async (req, res, next) => {
    const genre = await ProductGenre.findByPk(req.params.id);
    if (!genre) return next(new AppError(404));
    
    responseReturn(res, genre);
});

exports.createProductGenre = catchAsyncError(async (req, res) => {
    const genre = await ProductGenre.create(req.body);
    responseReturn(res, genre, 201);
});

exports.updateProductGenre = async (req, res, next) => {
    const [nbUpdated, genres] = await ProductGenre.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, genres[0]);
};

exports.deleteProductGenre = async (req, res, next) => {
    const result = await ProductGenre.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};