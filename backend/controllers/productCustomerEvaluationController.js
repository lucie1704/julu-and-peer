const { ProductCustomerEvaluation } = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getAll = catchAsyncError(async (req, res) => {
    const evaluations = await ProductCustomerEvaluation.findAll();
    responseReturn(res, evaluations);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const evaluation = await ProductCustomerEvaluation.findByPk(req.params.id);
    if (!evaluation) return next(new AppError(404));
    responseReturn(res, evaluation);
});

exports.create = catchAsyncError(async (req, res) => {
    const id = uuidv4();
    const evaluation = await ProductCustomerEvaluation.create({id, ...req.body});
    responseReturn(res, evaluation);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const evaluation = await ProductCustomerEvaluation.update(req.params.id, req.body);
    
    if (!evaluation) return next(new AppError(404));
    await evaluation.update(req.body);

    responseReturn(res, evaluation, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {
    const [nbUpdated, evaluations] = await ProductCustomerEvaluation.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    });

    if (nbUpdated === 0) return next(new AppError(404));

    responseReturn(res, evaluations[0], 200);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await ProductCustomerEvaluation.destroy({
        where: { id: req.params.id },
    });

    if (result === 0) return next(new AppError(404));

    res.status(204).send();
});
