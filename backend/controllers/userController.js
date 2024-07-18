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

// TODO: A changer : Faire annonymiser les données personnelles de l'utilisateur
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

exports.getAll = catchAsyncError(async ( req, res, next) => {
  const users = await User.findAll({ include: Customer });
    
  if (!users) return next(new AppError(404));

  responseReturn(res, users);
});

exports.get = catchAsyncError(async ( req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return next(new AppError(404));
  
  responseReturn(res, user);
});

exports.create = catchAsyncError(async ( req, res, next) => {
  const { firstname, lastname, email, password, passwordConfirmation } = req.body;
  
  const user = User.build({
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
  });
  await user.save();

  responseReturn(res, user);
});


exports.delete = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (!user) return next(new AppError(404, 'User not found'));

  await user.destroy();

  res.status(204).send();
});

exports.update = catchAsyncError(async (req, res, next) => {

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

    const { id, firstname, lastname, email, photo } = users[0];
    const user = { id, firstname, lastname, email, photo };
    responseReturn(res, user);
});




