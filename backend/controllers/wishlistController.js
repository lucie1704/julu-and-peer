const {responseReturn} = require('../utils/response');
const { Wishlist } = require('../models');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('./../utils/appError');

exports.createWishlist = catchAsyncError (async (req, res, next) => {
  const { slug, productId } = req.body
  
  const wishlist = await Wishlist.findOne({ where: { slug, productId } });

  if (wishlist) return next(new AppError('Product is already in Wishlist', 404));

  const createdWishlist = await Wishlist.create(req.body);

  return responseReturn(res, 201, { message: "Wishlist created successfully", createdWishlist });

});

exports.getWishlist = catchAsyncError (async (req, res, next) => {

  const wishlists = await Wishlist.findAll({ where: { customerId : req.params.id, } });;

  if (!wishlists) return next(new AppError('Wishlists is not found', 404));

  responseReturn(res, 200, {
    wishlistCount: wishlists.length,
    wishlists
  })
});

exports.deleteWishlist = catchAsyncError (async (req, res, next) => {

  const wishlist = await Wishlist.findByPk(req.params.id);

  if(!wishlist) return next(new AppError('Wishlist Item not found', 404));

  await wishlist.destroy();

  responseReturn(res,200,{message: "Wishlist removed successfully" })
});

