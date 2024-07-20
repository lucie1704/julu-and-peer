'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductGenre extends Model {
    static associate(models) {
      // Define associations
      ProductGenre.hasMany(models.Product, { foreignKey: 'genreId' });
    }

    static addHooks(models) {
      ProductGenre.addHook('afterUpdate', async (genre, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          // Fetch all products linked to the genre
          const products = await models.Product.findAll({ where: { genreId: genre.id } });
          // Denormalize each product
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clean document in Mongo
      // ProductGenre.addHook('afterDelete', async (genre) => {
      //   // Fetch all products linked to the genre
      //   const products = await models.Product.findAll({ where: { genreId: genre.id } });
      //   // Denormalize each product
      //   for (const product of products) {
      //     await denormalizeProduct(product, models);
      //   }
      // });
    }
  }
  
  ProductGenre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ProductGenre',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    timestamps: true,
  });

  return ProductGenre;
};
