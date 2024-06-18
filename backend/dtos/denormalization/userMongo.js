const User = require("../../models/mongo/user");
const AppError = require('../../utils/appError');
const filterObject = require('../../utils/filterObject');

exports.createMongoUser = async (user) => {
  const {id, name, email} = user;
  const newUser = await User.create({id, name, email});

  if (!newUser) return next(new AppError('Error failled to create user', 404));

  await newUser.save();
};

exports.updateMongoUser = async (user) => {
  // const filteredBody = filterObject(user, 'name', 'email' );
  // const updatedUser = await User.findByIdAndUpdate(user.id, filteredBody, {
  //   runValidators: true
  // });

  // if (!updatedUser) {
  //   return next(new AppError('No user found with that ID', 404));
  // }

  // await updatedUser.save();
};