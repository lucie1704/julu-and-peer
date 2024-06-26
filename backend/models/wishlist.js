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
      Wishlist.belongsTo(models.Customer, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      Wishlist.belongsToMany(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', through:"WishlistsProducts" });
    }
  }
  Wishlist.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
    name: {
      type: String,
      required : true
    },
    price: {
      type: Number,
      required : true
    },
    slug: {
      type: String,
      required : true
    },
    discount: DataTypes.INTEGER,
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
    timestamps: true,
  });
  return Wishlist;
};