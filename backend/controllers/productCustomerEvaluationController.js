const productCustomerEvaluation = require('../models/productcustomerevaluation');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');

exports.getAllProductCustomerEvaluations = catchAsyncError(async (req, res) => {
    const evaluations = await productCustomerEvaluation.findAll();
    responseReturn(res, evaluations);
});

exports.getProductCustomerEvaluationById = catchAsyncError(async (req, res, next) => {
    const evaluation = await productCustomerEvaluation.findByPk(req.params.id);
    if (!evaluation)  return next(new AppError(404));
    
    responseReturn(res, evaluation);
});

exports.createProductCustomerEvaluation = catchAsyncError(async (req, res) => {
    const evaluation = await productCustomerEvaluation.create(req.body);
    responseReturn(res, evaluation);
});

exports.updateProductCustomerEvaluation = catchAsyncError(async (req, res, next) => {
    const evaluation = await productCustomerEvaluation.update(req.params.id, req.body);
    
    if (!evaluation) return next(new AppError(404));
    await evaluation.update(req.body);

    responseReturn(res, evaluation, 201);
});

exports.deleteProductCustomerEvaluation = async (req, res, next) => {
    const result = await productCustomerEvaluation.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    res.status(204);
};