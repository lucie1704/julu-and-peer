'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingTrackerNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShippingTrackerNotification.belongsTo(models.Shipping);
    }
  }
  ShippingTrackerNotification.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShippingTrackerNotification',
    timestamps: true,
  });
  return ShippingTrackerNotification;
};