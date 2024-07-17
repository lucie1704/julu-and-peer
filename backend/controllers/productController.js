const {Product, ProductGenre,ProductFormat,ProductArtist,ProductCustomerEvaluation } = require('../models');
const ProductMongo = require("../models/mongo/product");
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        limit,
        offset,
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            { model: ProductCustomerEvaluation }
        ]
    });
    const totalPages = Math.ceil(count / limit);

    if(!rows) return next(new AppError('Error : fails to fetch products', 404));

    res.status(200).json({
        page,
        limit,
        totalItems: count,
        totalPages,
        data: rows
    });

    // TODO: Make This part work according to Zod schema.
    // const products = await ProductMongo.find()
    // .skip(offset)
    // .limit(limit)
    // .exec();
    // const totalItems = await ProductMongo.countDocuments().exec();
    // const totalPages = Math.ceil(totalItems / limit);

    // if(!products) return next(new AppError('Error : fails to fetch products', 404));

    // return responseReturn(res, 200, {
    //     page,
    //     limit,
    //     totalItems,
    //     totalPages,
    //     data: products,
    // });
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            { model: ProductCustomerEvaluation }
        ]
    });
    if(!product) return next(new AppError('Product not found', 404));

    return responseReturn(res, 200, product);
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if(!product) return next(new AppError('Product not found', 404));

    //TODO: Filter allowed propriaties
    await product.update(req.body);

    return responseReturn(res, 200, product);
});


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json();
        }
        await product.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json();
    }
};