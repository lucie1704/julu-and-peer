'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductGenre, { foreignKey: 'genreId' });
      Product.belongsTo(models.ProductFormat, { foreignKey: 'formatId' });
      Product.belongsTo(models.ProductArtist, { foreignKey: 'artistId' });
      Product.hasMany(models.ProductCustomerEvaluation, { foreignKey: 'productId' });
      Product.belongsToMany(models.Wishlist, { through: 'WishlistsProducts' });
      Product.hasMany(models.Stock, { foreignKey: 'productId' });
      Product.hasMany(models.Image, { foreignKey: 'productId' });
      Product.hasMany(models.OrderItemReturn, { foreignKey: 'productId' });
    }
    static addHooks(models) {
      Product.addHook('afterCreate', async (product) => {
        await denormalizeProduct(product, models);
      });
      Product.addHook('afterUpdate', async (product, { fields }) => {
        await denormalizeProduct(product, models);
      });
      // TODO: Delete Product document in Mongo.
      // Product.addHook('afterDestroy', async (product, { fields }) => {
      // });
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
      type: DataTypes.UUID,
      references: {
        model: 'ProductGenres',
        key: 'id'
      },
      allowNull: false
    },
    formatId: {
      type: DataTypes.UUID,
      references: {
        model: 'ProductFormats',
        key: 'id'
      },
      allowNull: false
    },
    artistId: {
      type: DataTypes.UUID,
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
      attributes: { exclude: ['genreId', 'formatId', 'artistId', 'createdAt', 'updatedAt'] },
    },
    timestamps: true,
  });
  return Product;
};