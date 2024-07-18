'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductGenre, { foreignKey: 'genreId' });
      Product.belongsTo(models.ProductFormat, { foreignKey: 'formatId' });
      Product.belongsTo(models.ProductArtist, { foreignKey: 'artistId' });
      Product.hasMany(models.ProductCustomerEvaluation, { foreignKey: 'productId' });
      Product.belongsToMany(models.Order, { through: models.OrdersProducts })
      Product.belongsToMany(models.Wishlist, { through: 'WishlistsProducts' });
      Product.hasMany(models.Stock);
      Product.hasMany(models.Image);
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductGenres',
        key: 'id'
      },
      allowNull: false
    },
    formatId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductFormats',
        key: 'id'
      },
      allowNull: false
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductArtists',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    defaultScope: {
      attributes: { exclude:
        [
        'genreId',
        'formatId',
        'artistId',
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return Product;
};