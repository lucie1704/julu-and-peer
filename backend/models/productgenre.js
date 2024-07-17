'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductGenre.hasMany(models.Product, { foreignKey: 'genreId' });
    }
    static addHooks(models) {
      ProductGenre.addHook('afterUpdate', async (genre, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          // On récupère tout les produits lié au genre.
          const products = await models.Product.findAll({ where: { genreId: genre.id } });
          // On denormalize chaque produit.
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clean document in Mongo.
      // ProductGenre.addHook('afterDelete', async (format, { fields }) => {
      //   // On récupère tout les produits lié au format.
      //   const products = await models.Product.findAll({ where: { formatId: format.id } });
      //   // On denormalize chaque produit.
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
      attributes: { exclude:
        [
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return ProductGenre;
};