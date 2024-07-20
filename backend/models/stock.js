'use strict';
const { Model } = require('sequelize');
const denormalizeProduct = require("../dtos/denormalization/product");

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Product, { foreignKey: 'productId' });
    }
    static addHooks(models) {
      Stock.addHook('afterCreate', async (stock, { fields }) => {
          const product = models.Product.findByPk(stock.productId);
          await denormalizeProduct(product, models);
      });
      Stock.addHook('afterUpdate', async (stock, { fields }) => {
        const product = await models.Product.findByPk(stock.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
      Stock.addHook('afterDestroy', async (stock, { fields }) => {
        const product = await models.Product.findByPk(stock.productId);
        if (product) {
          await denormalizeProduct(product, models);
        }
      });
    }
  }
  Stock.init({
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
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