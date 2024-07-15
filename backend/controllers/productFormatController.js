const ProductFormat = require('../models/productformat');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAllProductFormats = catchAsyncError(async (req, res) => {
    const formats = await ProductFormat.findAll();
    responseReturn(res, paymentMethods);
});

exports.getProductFormatById = catchAsyncError(async (req, res, next) => {
    const format = await ProductFormat.findByPk(req.params.id);
    if (!format) return next(new AppError(404));

    responseReturn(res, format);
});

exports.createProductFormat = catchAsyncError(async (req, res) => {
    const format = await ProductFormat.create(req.body);
    responseReturn(res, format, 201);
});

exports.updateProductFormat = catchAsyncError(async (req, res, next) => {

    const [nbUpdated, formats] = await ProductFormat.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, formats[0]);
});

exports.deleteProductFormat = async (req, res, next) => {
    const result = await ProductFormat.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};