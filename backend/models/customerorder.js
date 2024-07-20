'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    static associate(models) {
      CustomerOrder.belongsTo(models.Customer, { foreignKey: 'customerId' });
      // Define other associations if needed
    }
  }

  CustomerOrder.init({
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      },
      allowNull: false
    },
    products: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
    shippingInfo: DataTypes.JSON,
    deliveryStatus: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CustomerOrder',
    timestamps: true
  });

  return CustomerOrder;
};
