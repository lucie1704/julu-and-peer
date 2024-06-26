'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrdersProducts.belongsTo(models.Order);
      OrdersProducts.belongsTo(models.Product);
      OrdersProducts.belongsTo(models.OrderItemReturn);
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
    timestamps: true,
  });
  return OrdersProducts;
};