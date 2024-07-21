'use strict';

const { Model } = require('sequelize');
const denormalizeProduct = require('../dtos/denormalization/product');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      // Define association
      Stock.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
    }

    static addHooks(models) {
      Stock.addHook('afterCreate', async (stock) => {
        const product = await models.Product.findByPk(stock.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });

      Stock.addHook('afterUpdate', async (stock, { fields }) => {
        const product = await models.Product.findByPk(stock.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });

      Stock.addHook('afterDestroy', async (stock) => {
        const product = await models.Product.findByPk(stock.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
    }
  }

  Stock.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stock',
    timestamps: true
  });

  return Stock;
};
