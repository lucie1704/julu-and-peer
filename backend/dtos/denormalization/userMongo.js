const User = require("../../models/mongo/user");
const AppError = require('../../utils/appError');
const filterObject = require('../../utils/filterObject');

exports.createMongoUser = async (user) => {
  const {id, firstname, lastname, email} = user;
  const newUser = await User.create({id, firstname, lastname, email});

  if (!newUser) return next(new AppError(404));

  await newUser.save();
};

exports.updateMongoUser = async (user) => {
  // const filteredBody = filterObject(user, 'name', 'email' );
  // const updatedUser = await User.findByIdAndUpdate(user.id, filteredBody, {
  //   runValidators: true
  // });

  // if (!updatedUser) {
  //   return next(new AppError(404));
  // }

  // await updatedUser.save();
};