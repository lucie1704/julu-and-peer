const {Product, ProductGenre,ProductFormat,ProductArtist,ProductCustomerEvaluation } = require('../models');
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
    const products = await Product.findAll({
            include: [
                { model: ProductGenre },
                { model: ProductFormat },
                { model: ProductArtist },
                {model: ProductCustomerEvaluation}
            ]
    });

    if(!products) return next(new AppError('Error : fails to fetch products', 404));

    return responseReturn(res, 201, products );
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            {model: ProductCustomerEvaluation}
        ]
    });
    if(!product) return next(new AppError('Product not found', 404));

    return responseReturn(res, 201, product );
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if(!product) return next(new AppError('Product not found', 404));

    //TODO: Filter allowed propriaties
    await product.update(req.body);

    return responseReturn(res, 201, product );
});


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};