const {User, Customer} = require('../models');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const filterObject = require('../utils/filterObject');
const { responseReturn } = require('../utils/response');
const { uuidv7 } = require('uuidv7');

const id = uuidv7();

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

  const filteredBody = filterObject(req.body, 'firstname', 'lastname');

  const [nbUpdated, users] = await User.update(filteredBody, {
    where: {
        id: req.user.id,
    },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    const { id, firstname, lastname, email } = users[0];
    const user = { id, firstname, lastname, email };

    responseReturn(res, user);
});

// TODO: A changer : Faire annonymiser les données personnelles de l'utilisateur
exports.deleteMe = catchAsyncError(async (req, res, next) => {
  const result = await User.destroy({
    where: {
        id: req.user.id,
    },
  });

  if (!result) return next(new AppError(404));

  res.status(204);
});

// Méthodes pour Admin role

exports.getAll = catchAsyncError(async ( req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
          limit,
          offset,
          include: [
            { model: Customer },
          ]
      });
  const totalPages = Math.ceil(count / limit);

  responseReturn(res, {
      page,
      limit,
      totalItems: count,
      totalPages,
      data: rows
  });
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
    id,
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
      id: req.params.id,
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

  const filteredBody = filterObject(req.body, 'firstname', 'lastname', 'email');

  const [nbUpdated, users] = await User.update(filteredBody, {
    where: {
        id: req.params.id,
    },
        returning: true,
    });

    if (!nbUpdated === 1) return next(new AppError(404));

    const { id, firstname, lastname, email } = users[0];
    const user = { id, firstname, lastname, email };
    responseReturn(res, user);
});
