const { Product, ProductGenre, ProductFormat, ProductArtist, ProductCustomerEvaluation, Stock, Image } = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const {responseReturn} = require('../utils/response');
const { uuidv7 } = require('uuidv7');
const ProductMongo = require("../models/mongo/product");

const id = uuidv7();

exports.create = catchAsyncError(async (req, res) => {
    // Deconstruct body in order to get ID from objects.
    const { ProductArtist, ProductGenre, ProductFormat, ...data } = req.body;
    
    const createData = {
        ...data,
        artistId: ProductArtist.id,
        genreId: ProductGenre.id,
        formatId: ProductFormat.id,
    };
    // TODO: Add and use quantity in creation to make an stock(plus) and associate with product after create ?
    // TODO: Image too ?

    const product = await Product.create({id, ...createData});
    responseReturn(res, product, 201);
});

exports.getAll = catchAsyncError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset    = (page - 1) * limit;
    const search    = req.query.search || "";
    const genres    = req.query.genres ? req.query.genres.split(',') : [];
    const formats   = req.query.formats ? req.query.formats.split(',') : [];
    const sort      = req.query.sort || 'new';
    const discount  = req.query.discount || false;

    let query = {};
    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { "ProductArtist.name": { $regex: search, $options: "i" } }
            ]
        };
    }
    if (genres.length > 0) {
        query['ProductGenre.name'] = { $in: genres };
    }
    if (formats.length > 0) {
        query['ProductFormat.name'] = { $in: formats };
    }
    if (discount) {
        query.discount = { $gt: 0 };
    }

    let sortOptions = {};
    switch (sort) {
        case 'asc':
            sortOptions = { price: 1 };
            break;
        case 'desc':
            sortOptions = { price: -1 };
            break;
        case 'new':
            sortOptions = { createdAt: -1 };
            break;
        default:
            sortOptions = { createdAt: -1 };
            break;
    }

    const products = await ProductMongo.find(query)
        .sort(sortOptions)
        .skip(offset)
        .limit(limit)
        .exec();

    const genreFacet = await ProductMongo.aggregate([
        { $match: query },
        { $group: { _id: "$ProductGenre.name", count: { $sum: 1 } } },
    ]);
    const formatFacet = await ProductMongo.aggregate([
        { $match: query },
        { $group: { _id: "$ProductFormat.name", count: { $sum: 1 } } },
    ]);
    const discountFacet = await ProductMongo.aggregate([
        {  $match: {
                ...query,
                discount: { $gt: 0 }
            }
        },
        { $count: "count" }, 
    ]);

    const totalItems = await ProductMongo.find(query).countDocuments().exec();
    const totalPages = Math.ceil(totalItems / limit);
    if(!products) return next(new AppError('Error : fails to fetch products', 404));

    const response = {
        page,
        limit,
        totalItems,
        totalPages,
        data: products,
        facets: {
            genres: genreFacet,
            formats: formatFacet,
            discount: discountFacet,
        },
    };

    res.status(200).json(response);
});

exports.getById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: ProductGenre },
            { model: ProductFormat },
            { model: ProductArtist },
            { model: ProductCustomerEvaluation },
            { model: Image }
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