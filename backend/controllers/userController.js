const User = require('./../models/mongo/user');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');
const sendSuccessResponse = require('../utils/sendSuccessResponse');
const mongoose = require('mongoose');
const filterObject = require('./../utils/filterObject');


// User role
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsyncError(async (req, res, next) => {

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObject(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  sendSuccessResponse(updatedUser, res);

});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  sendSuccessResponse(null, res)
});

// Admin role
exports.createUser = catchAsyncError(async (req, res, next) => {
  
  const user = await User.create(req.body);

  sendSuccessResponse(user, res)
});

exports.getUser = catchAsyncError(async ( req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new AppError('Invalid user ID', 400, res));

  const user = await User.findById(req.params.id);
  
  if (!user) return next(new AppError('No document found with that ID', 404, res));

  sendSuccessResponse(user, res)
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new AppError('Invalid user ID', 400, res));

  const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404, res));
    }
  
  sendSuccessResponse(null, res)
});

exports.softDelete = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new AppError('Invalid user ID', 400, res));

  const user = await User.findById(req.params.id).select('+active');

  if(!user.active) return next(new AppError('User does not existe', 400, res));

  await User.findByIdAndUpdate(req.params.id, { active: false });

  sendSuccessResponse(null, res)
});

exports.updateUser =  catchAsyncError(async(req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new AppError('Invalid user ID', 400, res));

  const filteredBody = filterObject(req.body, 'name', 'email', 'photo', 'role', );

  const user = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  sendSuccessResponse(null, res)
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {

  const users = await User.find();

  if (!users) {
    return next(new AppError('No users found with', 404));
  }

  sendSuccessResponse(users, res)
});
