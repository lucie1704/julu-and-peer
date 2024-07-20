'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItemReturn extends Model {
    static associate(models) {
      OrderItemReturn.hasMany(models.OrdersProducts, { 
        foreignKey: 'orderItemReturnId',
        onDelete: 'CASCADE'
      });
    }
  }

  OrderItemReturn.init({
    reason: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderItemReturn',
    timestamps: true
  });

  return OrderItemReturn;
};
