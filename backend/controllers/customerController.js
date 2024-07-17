const {User, Customer} = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const AppError = require('./../utils/appError');

exports.create = catchAsyncError(async (req, res, next) => {
    const { userId, firstName, lastName } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return next(new AppError(404));
 
    const customer = await Customer.create({ userId, firstName, lastName });

    responseReturn(res, customer, 201);
});

exports.getAll = catchAsyncError(async (req, res, next) => {
    const customers = await Customer.findAll({ include: User });
    
    if (!customers) return next(new AppError(404));

    responseReturn(res, customers);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const customer = await Customer.findByPk(id, { include: User });
    if (!customer) return next(new AppError(404));
    
    responseReturn(res, customer);
});

exports.getByUserId = catchAsyncError(async (req, res, next) => {
    const customer = await Customer.findOne({
        where: {userId: parseInt(req.params.id, 10) },
        include: {
            model: User,
        },
    });

    if (!customer) return next(new AppError(404));
    
    responseReturn(res, customer);
});


exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, customers] = await Customer.update(req.body, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    const updatedCustomer = await Customer.findOne({
        where: {id: parseInt(req.params.id, 10) },
        include: {
            model: User,
        },
    });
    
    responseReturn(res, updatedCustomer);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await Customer.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
});