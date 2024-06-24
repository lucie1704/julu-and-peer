const jwt = require('jsonwebtoken');
const { User} = require('../models');
const AppError = require('./../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const Email = require('./../utils/email');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  const expires = new Date(Date.now() + 36000 * 1000);

  res.cookie('jwt', token, {
    expires,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsyncError(async (req, res) => {
  const { firstname, lastname, email, password, passwordConfirmation, role } = req.body;
  
  const newUser = User.build({
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
    role
  });

  console.log(newUser);

  // Generate email confirmation token
  const emailConfirmToken = newUser.createEmailConfirmToken();

  // Construct confirmation email URL
  const confirmEmailUrl = `http://localhost:8080/confirm-email/${emailConfirmToken}`;

  // Send email confirmation
  await new Email(newUser, confirmEmailUrl).sendWelcome();

  // Save the new user to the database
  await newUser.save();

  // Respond with success
  res.status(200).json(newUser);
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
      } 
    });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400, res));
  }

  user.emailConfirmExpires = undefined;

  if (user.emailConfirmed) return next(new AppError('This email has already been confirmed. Please proceed to log in.', 409));

  // Update user properties to confirm email
  user.emailConfirmToken = undefined;
  user.emailConfirmed = true
  await user.save();

  // Automatically login the user in after email confirmation
  req.body.email = user.email;
  return this.login(req, res, next);

});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password!', 400));
  
  const user = await User.findOne({
    where: { email },
    attributes: {
      include: ['emailConfirmed', 'password']
    }
  });
  

  if(!user) return next(new AppError('This email does not exist !', 400))

  if(!user.emailConfirmed) return next(new AppError('Your account is not confirmed. Please confirm your email address !', 400))

  const canLoginAgain = user.handleFailedLoginAttempts(next);

  if(!canLoginAgain) return next(new AppError('Account temporarily locked. Retry in 10 minutes. !', 400))

  let failAccess =  user.failAccess;

  if (!user || !(await user.correctPassword(password, user.password))) {

    user.failAccess = failAccess + 1;

    await user.save();

    return next(new AppError('Incorrect email or password', 401));
  }


  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/updateMyPassword`;
  if (user.shouldRenewPassword()) await new Email(user, resetURL).renewPassword();

  user.failAccess = 0;
  user.maxFailedLoginAt = undefined;
  await user.save();


  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.forgotMyPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ where: { email :req.body.email } });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = await user.createPasswordResetToken();

  try {
    const resetPasswordtURL = `http://localhost:8080/resetPassword/${resetToken}`

    await new Email(user, resetPasswordtURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(new AppError('There was an error sending the email. Try again later!', 500));
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
    return next(new AppError('Token is invalid or has expired', 400));
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

  if ((await user.correctPassword(req.body.password, user.password))) return next(new AppError('Incorrect. This password already existe, Please enter a new  password', 401));

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError('Your current password is wrong.', 401));

  user.password = req.body.password;
  user.passwordConfirmation = req.body.passwordConfirmation;
  await user.save();

  await new Email(user, "").sendPasswordUpdated();

  // Automatically login the user in after email confirmation
  req.body.email = user.email;
  return this.login(req, res, next);
});
