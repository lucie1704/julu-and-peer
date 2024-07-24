'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    static associate(models) {
      CustomerOrder.belongsTo(models.CustomerAddress, { 
        foreignKey: 'customerAddressId' 
      });
      CustomerOrder.belongsTo(models.OrderBilling, { 
        foreignKey: 'orderBillingId' 
      });
      CustomerOrder.belongsTo(models.Shipping, { 
        foreignKey: 'shippingId' 
      });
      CustomerOrder.belongsTo(models.Customer, { 
        foreignKey: 'customerId' 
      });
      CustomerOrder.hasMany(models.OrderItemReturn, { foreignKey: 'orderId' });
    }
  }

  CustomerOrder.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      validate: {
        async isValidProductArray(value) {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (!Array.isArray(value)) {
            throw new Error('Products must be an array');
          }
          value.forEach(product => {
            if (!product.id || !uuidRegex.test(product.id)) {
              throw new Error('Invalid product ID');
            }
          });
        }
      }
    },
    price: DataTypes.DECIMAL,
    paymentStatus: DataTypes.STRING,
    shippingInfo: DataTypes.JSON,
    billingInfo: DataTypes.JSON,
    deliveryStatus: DataTypes.STRING,
    date: DataTypes.DATE,
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
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
    }
  }, {
    sequelize,
    modelName: 'CustomerOrder',
    timestamps: true
  });

  return CustomerOrder;
};
