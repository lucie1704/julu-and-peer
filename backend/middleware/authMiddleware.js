const jwt = require("jsonwebtoken");
const { User} = require('../models');

module.exports = async function checkAuth(req, res, next) {
  const header = req.headers.Authorization ?? req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('ETTETETETEEEETTTETTETETTETETETETE');
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'email', 'role'],
    });
    console.log('USUSSUUSUUSUUSUSUSUUUSUUSUSUUSUSUSU');

    console.log(user);

    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (e) {
    console.log('KJKKJKJKKJKJKJKJKJJJKJKJKJKJKJKJKJKJKJ');
    console.log(e);
    console.log('KJKKJKJKKJKJKJKJKJJJKJKJKJKJKJKJKJKJKJ');

    res.sendStatus(401);
  }
};