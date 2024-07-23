'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      PaymentMethod.belongsTo(models.CustomerAddress, { 
        foreignKey: 'billingAddressId', 
        onDelete: 'CASCADE' 
      });
      PaymentMethod.hasMany(models.OrderBilling, { 
        foreignKey: 'paymentMethodId', 
        onDelete: 'CASCADE' 
      });
    }
  }

  PaymentMethod.init({
    type: {
      type: DataTypes.ENUM('credit_card', 'debit_card', 'paypal', 'stripe'),
      allowNull: false
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardExpireDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingAddressId: {
      type: DataTypes.UUID,
      references: {
        model: 'CustomerAddresses',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    timestamps: true
  });

  return PaymentMethod;
};
