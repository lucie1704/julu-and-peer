'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    static associate(models) {
      // Define associations
      Shipping.hasOne(models.CustomerOrder, { foreignKey: 'shippingId', onDelete: 'SET NULL' });
      Shipping.hasMany(models.ShippingTrackerNotification, { foreignKey: 'shippingId', onDelete: 'CASCADE' });
    }
  }

  Shipping.init({
    trackNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    receiptDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Shipping',
    timestamps: true,
  });

  return Shipping;
};
