'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductArtist extends Model {
    static associate(models) {
      ProductArtist.hasMany(models.Product, { foreignKey: 'artistId' });
      ProductArtist.hasOne(models.Image, { foreignKey: 'artistId' });
    }

    static addHooks(models) {
      ProductArtist.addHook('afterUpdate', async (artist, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          const products = await models.Product.findAll({ where: { artistId: artist.id } });
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clear document in Mongo.
      // ProductArtist.addHook('afterDestroy', async (artist) => {
      //   const products = await models.Product.findAll({ where: { artistId: artist.id } });
      //   for (const product of products) {
      //     await denormalizeProduct(product, models);
      //   }
      // });
    }
  }

  ProductArtist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ProductArtist',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    timestamps: true,
  });

  return ProductArtist;
};
