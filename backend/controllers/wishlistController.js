const {responseReturn} = require('../utils/response');
const { Wishlist } = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.create = catchAsyncError (async (req, res, next) => {
  const { slug, productId } = req.body
  
  const wishlist = await Wishlist.findOne({ where: { slug, productId } });

  if (wishlist) return next(new AppError(409));

  const createdWishlist = await Wishlist.create(req.body);

  return responseReturn(res, createdWishlist, 201);
});

exports.getAll = catchAsyncError (async (req, res, next) => {

  const wishlists = await Wishlist.findAll({ where: { customerId : req.params.id, } });;

  if (!wishlists) return next(new AppError(404));

  wishlists.wishlistCount = wishlists.length

  responseReturn(res,  wishlists)
});

exports.getById = catchAsyncError(async (req, res, next) => {
  const wishlist = await Wishlist.findByPk(req.params.id);
  if (!wishlist) return next(new AppError(404));
  
  responseReturn(res, wishlist);
});

exports.update = catchAsyncError(async (req, res, next) => {
  const [nbUpdated, wishlists] = await Wishlist.update(req.body, {
      where: {
          id: parseInt(req.params.id, 10),
      },
      returning: true,
  });

  if (!nbUpdated === 1) return next(new AppError(404));

  responseReturn(res, wishlists[0]);
});


exports.delete = catchAsyncError (async (req, res, next) => {
  const result = await Wishlist.destroy({
    where: {
        id: parseInt(req.params.id, 10),
    },
  });

  if (!result) return next(new AppError(404));

  res.status(204);
});

