const ProductFormat = require('../models/productformat');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAll = catchAsyncError(async (req, res) => {
    const formats = await ProductFormat.findAll();
    responseReturn(res, paymentMethods);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const format = await ProductFormat.findByPk(req.params.id);
    if (!format) return next(new AppError(404));

    responseReturn(res, format);
});

exports.create = catchAsyncError(async (req, res) => {
    const format = await ProductFormat.create(req.body);
    responseReturn(res, format, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {

    const [nbUpdated, formats] = await ProductFormat.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, formats[0]);
});

exports.delete = async (req, res, next) => {
    const result = await ProductFormat.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};