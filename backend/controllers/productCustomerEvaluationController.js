const {ProductCustomerEvaluation} = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const { uuidv7 } = require('uuidv7');

const id = uuidv7();

exports.getAll = catchAsyncError(async (req, res) => {
    const evaluations = await ProductCustomerEvaluation.findAll();
    responseReturn(res, evaluations);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const evaluation = await ProductCustomerEvaluation.findByPk(req.params.id);
    if (!evaluation)  return next(new AppError(404));
    
    responseReturn(res, evaluation);
});

exports.create = catchAsyncError(async (req, res) => {
    const evaluation = await ProductCustomerEvaluation.create({id, ...req.body});
    responseReturn(res, evaluation);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const evaluation = await ProductCustomerEvaluation.update(req.params.id, req.body);
    
    if (!evaluation) return next(new AppError(404));
    await evaluation.update(req.body);

    responseReturn(res, evaluation, 201);
});

exports.delete = async (req, res, next) => {
    const result = await ProductCustomerEvaluation.destroy({
        where: {
            id: req.params.id
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};