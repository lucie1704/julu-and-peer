'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductFormat extends Model {
    static associate(models) {
      ProductFormat.hasMany(models.Product, { foreignKey: 'formatId' });
    }
    
    static addHooks(models) {
      ProductFormat.addHook('afterUpdate', async (format, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          const products = await models.Product.findAll({ where: { formatId: format.id } });
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clean document in Mongo.
      // ProductFormat.addHook('afterDelete', async (format) => {
      //   const products = await models.Product.findAll({ where: { formatId: format.id } });
      //   for (const product of products) {
      //     await denormalizeProduct(product, models);
      //   }
      // });
    }
  }

  ProductFormat.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ProductFormat',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    timestamps: true,
  });

  return ProductFormat;
};
