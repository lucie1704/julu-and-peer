const jwt = require("jsonwebtoken");
const { User } = require('../models');
const AppError = require('../utils/AppError');
const roles = ['admin'];

module.exports = async function checkAdmin(req, res, next) {
  const header = req.headers.Authorization ?? req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'email', 'role'],
    });

    if (!user) return res.sendStatus(401);
    req.user = user;

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }

    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
