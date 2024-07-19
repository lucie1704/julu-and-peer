const AppError = require('../utils/appError');

const autorizationMiddleware = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403)
      );
    }

    next();
  };
};

module.exports = autorizationMiddleware;