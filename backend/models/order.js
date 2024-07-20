'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, { 
        through: models.OrdersProducts, 
        foreignKey: 'orderId' 
      });
      Order.belongsTo(models.CustomerAddress, { 
        foreignKey: 'customerAddressId' 
      });
      Order.belongsTo(models.OrderBilling, { 
        foreignKey: 'orderBillingId' 
      });
      Order.belongsTo(models.Shipping, { 
        foreignKey: 'shippingId' 
      });
      Order.belongsTo(models.Customer, { 
        foreignKey: 'customerId' 
      });
    }
  }

  Order.init({
    paymentStatus: DataTypes.STRING,
    date: DataTypes.DATE,
    customerAddressId: {
      type: DataTypes.UUID,
      references: {
        model: 'CustomerAddresses',
        key: 'id'
      }
    },
    orderBillingId: {
      type: DataTypes.UUID,
      references: {
        model: 'OrderBillings',
        key: 'id'
      }
    },
    shippingId: {
      type: DataTypes.UUID,
      references: {
        model: 'Shippings',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: true
  });

  return Order;
};
