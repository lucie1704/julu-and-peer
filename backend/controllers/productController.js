const {Product, ProductGenre,ProductFormat,ProductArtist,ProductCustomerEvaluation } = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');

exports.create = catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body);
    responseReturn(res, product, 201);
});

exports.getAll = catchAsyncError(async (req, res) => {
    const products = await Product.findAll({
            include: [
                { model: ProductGenre },
                { model: ProductFormat },
                { model: ProductArtist },
                {model: ProductCustomerEvaluation}
            ]
    });

    return responseReturn(res, products );
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            {model: ProductCustomerEvaluation}
        ]
    });

    if(!product) return next(new AppError(404));

    return responseReturn(res, product );
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, products] = await Product.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, products[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await Product.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
});