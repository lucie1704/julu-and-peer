const { responseReturn } = require('../utils/response');
const { Wishlist } = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const { v4: uuidv4 } = require('uuid');

exports.create = catchAsyncError (async (req, res, next) => {
  const id = uuidv4();
  const { slug, productId } = req.body
  
  const wishlist = await Wishlist.findOne({ where: { slug, productId } });

  if (wishlist) return next(new AppError(409));

  const createdWishlist = await Wishlist.create({ id, ...req.body });

  return res.status(201).json(createdWishlist);
});

exports.getAll = catchAsyncError(async (req, res, next) => {
  const wishlists = await Wishlist.findAll({ where: { customerId: req.params.id } });

  if (!wishlists.length) return next(new AppError(404));

  wishlists.wishlistCount = wishlists.length;

  responseReturn(res, wishlists);
});

exports.getById = catchAsyncError(async (req, res, next) => {
  const wishlist = await Wishlist.findByPk(req.params.id);
  if (!wishlist) return next(new AppError(404));

  responseReturn(res, wishlist);
});

exports.update = catchAsyncError(async (req, res, next) => {
  const [nbUpdated] = await Wishlist.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });

  if (nbUpdated === 0) return next(new AppError(404));

  const updatedWishlist = await Wishlist.findByPk(req.params.id);
  if (!updatedWishlist) return next(new AppError(404));

  responseReturn(res, updatedWishlist);
});

exports.delete = catchAsyncError(async (req, res, next) => {
  const result = await Wishlist.destroy({
    where: { id: req.params.id },
  });

  if (result === 0) return next(new AppError(404));

  res.status(204).send();
});
