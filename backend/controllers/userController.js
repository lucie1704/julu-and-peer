const {User, Customer} = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const filterObject = require('../utils/filterObject');
const { responseReturn } = require('../utils/response');


// Méthodes pour User role

exports.getMe = (req, res,) => {
  res.json(req.user);
};

exports.updateMe = catchAsyncError(async (req, res, next) => {

  if (req.body.password || req.body.passwordConfirmation) {
    return next(
      new AppError(400)
    );
  }

  const filteredBody = filterObject(req.body, 'firstname', 'lastname', 'photo');

  const [nbUpdated, users] = await User.update(filteredBody, {
    where: {
        id: parseInt(req.user.id, 10),
    },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    const { id, firstname, lastname, email, photo } = users[0];
    const user = { id, firstname, lastname, email, photo };

    responseReturn(res, user);
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  const result = await User.destroy({
    where: {
        id: parseInt(req.user.id, 10),
    },
  });

  if (!result) return next(new AppError(404));

  res.status(204);
});

// Méthodes pour Admin role

exports.getAllUsers = catchAsyncError(async ( req, res, next) => {
  const users = await User.findAll({ include: Customer });
    
  if (!users) return next(new AppError(404));

  responseReturn(res, users);
});

exports.getUser = catchAsyncError(async ( req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return next(new AppError(404));
  
  responseReturn(res, user);
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const result = await User.destroy({
    where: {
        id: parseInt(req.params.id, 10),
    },
  });

  if (!result) return next(new AppError(404));

  res.status(204);
});

exports.updateUser = catchAsyncError(async (req, res, next) => {

  if (req.body.password || req.body.passwordConfirmation) {
    return next(
      new AppError(400)
    );
  }

  const filteredBody = filterObject(req.body, 'firstname', 'lastname', 'email', 'photo');

  const [nbUpdated, users] = await User.update(filteredBody, {
    where: {
        id: parseInt(req.params.id, 10),
    },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    responseReturn(res, users[0]);
});
