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
    // products: DataTypes.ARRAY(DataTypes.STRING),
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      validate: {
        async isValidProductArray(value) {
          // if (!Array.isArray(value)) {
          //   throw new Error('Products must be an array.');
          // }
          for (const product of value) {
            if (!product.id || !DataTypes.UUID.test(product.id)) {
              throw new Error('Each product must have a valid UUID as "id".');
            }
            // Vérifiez que l'ID du produit existe dans la table Products
            const productExists = await Product.findByPk(product.id);
            if (!productExists) {
              throw new Error(`Product with ID ${product.id} does not exist.`);
            }
          }
        }
      }
    },
    price: DataTypes.INTEGER,
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
