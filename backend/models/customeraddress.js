'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerAddress extends Model {
    static associate(models) {
      const cascadeOptions = { onDelete: 'CASCADE', onUpdate: 'CASCADE' };

      CustomerAddress.belongsTo(models.Customer, { foreignKey: 'customerId', ...cascadeOptions });
      CustomerAddress.hasMany(models.PaymentMethod, { foreignKey: 'billingAddressId', ...cascadeOptions });
      CustomerAddress.hasMany(models.CustomerOrder, { foreignKey: 'customerAddressId', ...cascadeOptions });
    }
  }

  CustomerAddress.init({
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      },
      allowNull: false
    },
    addressType: DataTypes.STRING,
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLine2: DataTypes.STRING,
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerAddress',
    timestamps: true
  });

  return CustomerAddress;
};