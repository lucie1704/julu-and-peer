'use strict';

const { Model } = require('sequelize');
const denormalizeProduct = require('../dtos/denormalization/product');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
    }

    static addHooks(models) {
      const updateProductQuantity = async (productId) => {
        const product = await models.Product.findByPk(productId);
        if (product) {
          const stocks = await Stock.findAll({ where: { productId } });
          let totalQuantity = 0;
          
          for (const stock of stocks) {
            if (stock.type === 'plus') {
              totalQuantity += stock.quantity;
            } else if (stock.type === 'minus') {
              totalQuantity -= stock.quantity;
            }
          }

          product.quantity = Math.max(0, totalQuantity);
          await product.save();
          await denormalizeProduct(product, models);
        }
      };

      Stock.addHook('afterCreate', async (stock) => {
        await updateProductQuantity(stock.productId);
      });

      Stock.addHook('afterUpdate', async (stock) => {
        await updateProductQuantity(stock.productId);
      });

      Stock.addHook('afterDestroy', async (stock) => {
        await updateProductQuantity(stock.productId);
      });
    }
  }

  Stock.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['plus', 'minus']]
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
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
