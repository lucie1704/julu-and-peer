'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItemReturn extends Model {
    static associate(models) {
      OrderItemReturn.belongsTo(models.CustomerOrder, {
        foreignKey: 'orderId' 
      });
      OrderItemReturn.belongsTo(models.Product, {
        foreignKey: 'productId' 
      });
    }
  }

  OrderItemReturn.init({
    reason: DataTypes.STRING,
    date: DataTypes.DATE,
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'CustomerOrders',
        key: 'id'
      },
      allowNull: false
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrderItemReturn',
    timestamps: true
  });

  return OrderItemReturn;
};
