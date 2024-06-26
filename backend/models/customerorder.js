'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerOrder.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  }
  CustomerOrder.init({
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      },
      allowNull: false,
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
    timestamps: true,
  });
  return CustomerOrder;
};