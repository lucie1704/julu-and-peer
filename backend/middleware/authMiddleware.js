const jwt = require('jsonwebtoken');
const { User} = require('../models');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const authMiddleware = async (req, res, next) => {
  try {
    // Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token does not exist.', 401)
      );
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(new AppError(err, 500));
  }
};

module.exports = authMiddleware;
