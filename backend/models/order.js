'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.CustomerAddress);
      Order.belongsToMany(models.Product);
      Order.belongsTo(models.OrderBilling, { through: models.OrdersProducts });
      Order.belongsTo(models.Shipping);
    }
  }
  Order.init({
    // orderId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'Orders',
    //     key: 'id'
    //   },
    //   allowNull: false,
    // },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};