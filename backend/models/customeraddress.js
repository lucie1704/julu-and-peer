'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const cascadeOptions = { onDelete: 'CASCADE', onUpdate: 'CASCADE' };

      // define association here
      CustomerAddress.belongsTo(models.Customer, { ...cascadeOptions });
      CustomerAddress.hasMany(models.PaymentMethod, { ...cascadeOptions });
      CustomerAddress.hasMany(models.Order, { ...cascadeOptions });
    }
  }
  CustomerAddress.init({
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      },
      allowNull: false,
    },
    addressType: DataTypes.STRING,
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: DataTypes.STRING,
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerAddress',
    timestamps: true,
  });
  return CustomerAddress;
};