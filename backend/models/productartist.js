'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class ProductArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductArtist.hasMany(models.Product, { foreignKey: 'artistId' });
      ProductArtist.hasOne(models.Image, { foreignKey: 'artistId' });
    }
    static addHooks(models) {
      ProductArtist.addHook('afterUpdate', async (artist, { fields }) => {
        if (fields.includes('name') || fields.includes('description')) {
          // On récupère tout les produits lié a l'artiste.
          const products = await models.Product.findAll({ where: { artistId: artist.id } });
          // On denormalize chaque produit.
          for (const product of products) {
            await denormalizeProduct(product, models);
          }
        }
      });
      // TODO: Clear document in Mongo.
      // ProductArtist.addHook('afterDelete', async (artist, { fields }) => {
      //   // On récupère tout les produits lié a l'artiste.
      //   const products = await models.Product.findAll({ where: { artistId: artist.id } });
      //   // On denormalize chaque produit.
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
      attributes: { exclude:
        [
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return ProductArtist;
};