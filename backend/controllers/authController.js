const jwt = require('jsonwebtoken');
const { User, Customer} = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const Email = require('./../utils/email');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');
const { uuidv7 } = require('uuidv7');


const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id, user.role);

  const expires = new Date(Date.now() + 36000 * 1000);

  res.cookie('jwt', token, {
    expires,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  
  res.status(statusCode).json(token);
};

exports.signup = catchAsyncError(async (req, res) => {
  const { firstname, lastname, email, password, passwordConfirmation } = req.body;
  
  const newUser = User.build({
    id : uuidv7(),
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
  });

  // Generate email confirmation token
  const emailConfirmToken = newUser.createEmailConfirmToken();

  // Construct confirmation email URL
  let confirmEmailUrl;

  if (process.env.NODE_ENV === 'production') {
    confirmEmailUrl = `www.juluandpeer.store/confirm-email/${emailConfirmToken}`;
  } else {
    confirmEmailUrl = `http://localhost:8080/confirm-email/${emailConfirmToken}`;
  }
  // Send email confirmation
  await new Email(newUser, confirmEmailUrl).sendWelcome();

  // Save the new user to the database
  await newUser.save();

  // Respond with success
  res.status(202).send();
});

exports.emailConfirm = catchAsyncError(async (req, res, next) => {

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({
      where: {
        emailConfirmToken: hashedToken,
        emailConfirmExpires: {
          [Sequelize.Op.gt]: Sequelize.fn('NOW')
        }
      },
      attributes: {
        include: ['role']
      }
    });

  if (!user) {
    return next(new AppError(401));
  }

  user.emailConfirmExpires = undefined;

  if (user.emailConfirmed) return next(new AppError(409));

  // Update user properties to confirm email
  user.emailConfirmToken = undefined;
  user.emailConfirmed = true
  await user.save();

  const {id:userId, firstName, lastName}= user
  await Customer.create({id : uuidv7(), userId, firstName, lastName });

  await new Email(user, "").sendLogin();

  createSendToken(user, 200, req, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError(401));
  
  const user = await User.findOne({
    where: { email },
    attributes: {
      include: ['emailConfirmed', 'password', 'role']
    }
  });
  

  if(!user) return next(new AppError(404))

  if(!user.emailConfirmed) return next(new AppError(409))

  const canLoginAgain = user.handleFailedLoginAttempts(next);

  if(!canLoginAgain) return next(new AppError(423))

  let failAccess =  user.failAccess;

  if (!user || !(await user.correctPassword(password, user.password))) {

    user.failAccess = failAccess + 1;

    await user.save();

    return next(new AppError(401));
  }


  const resetURL = `${req.protocol}://${req.get('host')}/api/users/updateMyPassword`;
  if (user.shouldRenewPassword()) await new Email(user, resetURL).renewPassword();

  user.failAccess = 0;
  user.maxFailedLoginAt = undefined;
  await user.save();

  await new Email(user, "").sendLogin();

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(204).send();
};

exports.forgotMyPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ where: { email :req.body.email } });

  if (!user) {
    return next(new AppError(404));
  }

  const resetToken = await user.createPasswordResetToken();

  try {
    const resetPasswordtURL = `http://localhost:8080/resetPassword/${resetToken}`

    await new Email(user, resetPasswordtURL).sendPasswordReset();

    res.status(202).send();
    
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(new AppError(500));
  }

});

exports.resetMyPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

 
  const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          [Sequelize.Op.gt]: Sequelize.fn('NOW')
        }
      }
    });
  
  if (!user) {
    return next(new AppError(404));
  }

  // Construct login email URL
  const loginUrl = `http://localhost:8080/login`;

  // Send email confirmation
  await new Email(user, loginUrl).confirmPasswordReset();

  // Update user properties
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  
  // Automatically login the user in after email confirmation
  req.body.email = user.email;
  return this.login(req, res, next);
});

exports.updateMyPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne(
    { where: { id :req.user.id },
    attributes: {
      include: ['password']
    }
  });

  if ((await user.correctPassword(req.body.password, user.password))) return next(new AppError(401, res));

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError(401, res));

  user.password = req.body.password;
  user.passwordConfirmation = req.body.passwordConfirmation;
  await user.save();

  await new Email(user, "").sendPasswordUpdated();

  createSendToken(user, 201, req, res);
});