const PaymentMethod = require('../models/paymentmethod');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const AppError = require('./../utils/appError');

exports.getAll = catchAsyncError(async (req, res) => {

    const paymentMethods = await PaymentMethod.findAll();

    responseReturn(res, paymentMethods);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);

    if (!paymentMethod) return next(new AppError(404));
    
    responseReturn(res, paymentMethod);
});

exports.create = catchAsyncError(async (req, res) => {
    const paymentMethod = await PaymentMethod.create(req.body);
    
    responseReturn(res, paymentMethod, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, paymentMethods] = await PaymentMethod.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, paymentMethods[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await PaymentMethod.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
});