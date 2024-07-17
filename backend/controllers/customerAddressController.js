const CustomerAddress = require('../models/customeraddress');
const Customer = require('../models/customer');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const { responseReturn } = require('../utils/response');


exports.create = catchAsyncError (async (req, res, next) => {
    const customer = await Customer.findByPk(req.body.customerId);
    if (!customer)  return  next(new AppError(404));

    const customerAddress = await CustomerAddress.create(req.body);

    return responseReturn(res, customerAddress);
});

exports.getAll = catchAsyncError(async (req, res) => {
    const customerAddresses = await CustomerAddress.findAll();
    return responseReturn(res, customerAddresses);
});

exports.getById = catchAsyncError (async (req, res, next) => {
    const customerAddress = await CustomerAddress.findByPk(req.params.id);

    if (!customerAddress)  return  next(new AppError(404));
    return responseReturn(res, customerAddress);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, customerAddresses] = await CustomerAddress.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, customerAddresses[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await CustomerAddress.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
});