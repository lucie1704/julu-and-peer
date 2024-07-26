const { Product, ProductFormat } = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const { responseReturn } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getAll = catchAsyncError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const { count, rows } = await ProductFormat.findAndCountAll({
        limit,
        offset,
    });
    const totalPages = Math.ceil(count / limit);

    responseReturn(res, {
        page,
        limit,
        totalItems: count,
        totalPages,
        data: rows
    })
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const format = await ProductFormat.findByPk(req.params.id);
    if (!format) return next(new AppError(404));

    responseReturn(res, format);
});

exports.create = catchAsyncError(async (req, res) => {
    const id = uuidv4();
    const format = await ProductFormat.create({id, ...req.body});
    responseReturn(res, format, 201);
});

exports.update = catchAsyncError(async (req, res, next) => {

    const [nbUpdated, formats] = await ProductFormat.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        individualHooks: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, formats[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const format = await ProductFormat.findByPk(req.params.id);

    if (!format) return next(new AppError(404));

    const productsCount = await Product.count({ where: { formatId: format.id } });

    // On check si il y a un produit associé, si ce n'est pas le cas on peut le supprimer.
    if (productsCount > 0) {
        return res.status(400).json({ message: 'Vous ne pouvez pas supprimer un format qui est encore associé a des produits.' });
    }

    const result = await format.destroy();
    responseReturn(res, result, 204);
});

exports.options = catchAsyncError(async (req, res, next) => {
    const newItem = {
        name: '',
        description: ''
    };

    responseReturn(res, newItem)
});