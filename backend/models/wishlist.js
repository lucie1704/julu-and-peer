'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.Customer);
      Wishlist.belongsToMany(models.Product);
    }
  }
  Wishlist.init({
    name: DataTypes.STRING,
    slug: {
      type: String,
      required : true
    },
    image: {
      type: String,
      required : true
    },
    rating: {
      type: Number,
      default : 0,
      validate: {
        max: 5,
        min: 0
      },
    },
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};