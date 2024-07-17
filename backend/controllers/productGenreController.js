const ProductGenre = require('../models/productgenre');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAll = catchAsyncError(async (req, res) => {
    const genres = await ProductGenre.findAll();

    responseReturn(res, genres);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const genre = await ProductGenre.findByPk(req.params.id);
    if (!genre) return next(new AppError(404));
    
    responseReturn(res, genre);
});

exports.create = catchAsyncError(async (req, res) => {
    const genre = await ProductGenre.create(req.body);
    responseReturn(res, genre, 201);
});

exports.update = async (req, res, next) => {
    const [nbUpdated, genres] = await ProductGenre.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, genres[0]);
};

exports.delete = async (req, res, next) => {
    const result = await ProductGenre.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};