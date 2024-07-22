const { PaymentMethod } = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const AppError = require('./../utils/appError');
const { uuidv7 } = require('uuidv7');

const id = uuidv7();

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
    const paymentMethod = await PaymentMethod.create({id, ...req.body});
    
    responseReturn(res, paymentMethod, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, paymentMethods] = await PaymentMethod.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, paymentMethods[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await PaymentMethod.destroy({
        where: {
            id: req.params.id
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204).send();
});