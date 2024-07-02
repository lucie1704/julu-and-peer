'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipping.hasOne(models.Order);
      Shipping.hasMany(models.ShippingTrackerNotification);
    }
  }
  Shipping.init({
    trackNumber: DataTypes.STRING,
    shippingDate: DataTypes.DATE,
    receiptDate: DataTypes.DATE,
    status : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Shipping',
    timestamps: true,
  });
  return Shipping;
};