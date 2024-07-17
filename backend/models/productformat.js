'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductFormat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductFormat.hasMany(models.Product, { foreignKey: 'formatId' });
    }
    static addHooks(models) {
      ProductFormat.addHook('afterUpdate', async (format, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          // On récupère tout les produits lié au format.
          const products = await models.Product.findAll({ where: { formatId: format.id } });
          // On denormalize chaque produit.
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clean document in Mongo.
      // ProductFormat.addHook('afterDelete', async (format, { fields }) => {
      //   // On récupère tout les produits lié au format.
      //   const products = await models.Product.findAll({ where: { formatId: format.id } });
      //   // On denormalize chaque produit.
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
      attributes: { exclude:
        [
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return ProductFormat;
};