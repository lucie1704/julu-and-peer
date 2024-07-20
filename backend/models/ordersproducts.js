'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdersProducts extends Model {
    static associate(models) {
      OrdersProducts.belongsTo(models.Order, { 
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
      });
      OrdersProducts.belongsTo(models.Product, { 
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });
      OrdersProducts.belongsTo(models.OrderItemReturn, { 
        foreignKey: 'orderItemReturnId',
        allowNull: true
      });
    }
  }

  OrdersProducts.init({
    priceWhenOrdering: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrdersProducts',
    timestamps: true
  });

  return OrdersProducts;
};
