const {Product, ProductGenre, ProductFormat, ProductArtist, ProductCustomerEvaluation } = require('../models');
const ProductMongo = require("../models/mongo/product");
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');

exports.create = catchAsyncError(async (req, res) => {
    // Deconstruct body in order to get ID from objects.
    const { ProductArtist, ProductGenre, ProductFormat, ...data } = req.body;
    
    const createData = {
        ...data,
        artistId: ProductArtist.id,
        genreId: ProductGenre.id,
        formatId: ProductFormat.id,
    };

    const product = await Product.create(createData);
    responseReturn(res, product, 201);
});

exports.getAll = catchAsyncError(async (req, res) => {
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

    responseReturn(res, {
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

    // responseReturn(res, 200, {
    //     page,
    //     limit,
    //     totalItems,
    //     totalPages,
    //     data: products,
    // });
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            { model: ProductCustomerEvaluation }
        ]
    });

    if(!product) return next(new AppError(404));

    return responseReturn(res, product );
});

exports.update = catchAsyncError(async (req, res, next) => {
    // Deconstruct body in order to get ID from objects.
    const { ProductArtist, ProductGenre, ProductFormat, ...data } = req.body;
    
    const updatedData = {
        ...data,
        artistId: ProductArtist.id,
        genreId: ProductGenre.id,
        formatId: ProductFormat.id,
    };

    const [nbUpdated, products] = await Product.update(updatedData, {
        where: {
            id: parseInt(req.params.id, 10),
        },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, products[0]);
});

exports.delete = catchAsyncError(async (req, res, next) => {
    const result = await Product.destroy({
        where: {
            id: parseInt(req.params.id, 10),
        },
    });

    if (!result) return next(new AppError(404));

    responseReturn(res, result, 204);
});

exports.options = catchAsyncError(async (req, res, next) => {
    const newItem = {
        name: '',
        description: '',
        price: 0,
        availableStock: 0,
        imageSrc: '',
        imageAlt: '',
        reviewCount: 0,
        discount: 0,
        ProductArtist: { 'id': null },
        ProductGenre: { 'id': null },
        ProductFormat: { 'id': null }
    };

    const artists = await ProductArtist.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    });
    
    const formats = await ProductFormat.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    });
    
    const genres = await ProductGenre.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    });

    responseReturn(res, {
        artists,
        formats,
        genres,
        newItem
    })
});