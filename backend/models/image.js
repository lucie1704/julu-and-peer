'use strict';
const {
  Model
} = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");


module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
        allowNull: true
      });
      Image.belongsTo(models.ProductArtist, {
        foreignKey: 'artistId',
        allowNull: true
      });
    }

    static addHooks(models) {
      Image.addHook('afterCreate', async (image, { fields }) => {
        const product = await models.Product.findByPk(image.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
      Image.addHook('afterUpdate', async (image, { fields }) => {
        const product = await models.Product.findByPk(image.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
      Image.addHook('afterDestroy', async (image, { fields }) => {
        const product = await models.Product.findByPk(image.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
    }
  }

  Image.init({
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    alt: DataTypes.TEXT,
    path: DataTypes.STRING,
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: true
    },
    artistId: {
      type: DataTypes.UUID,
      references: {
        model: 'ProductArtists',
        key: 'id'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Image',
    timestamps: true
  });

  return Image;
};
