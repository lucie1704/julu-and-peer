'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItemReturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItemReturn.hasMany(models.OrdersProducts);
    }
  }
  OrderItemReturn.init({
    reason: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderItemReturn',
    timestamps: true,
  });
  return OrderItemReturn;
};