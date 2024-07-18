module.exports.responseReturn = (res, data, code = 200, ) => {
  return res.status(code).json(data);
};