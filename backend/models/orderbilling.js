'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderBilling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderBilling.belongsTo(models.PaymentMethod);
      OrderBilling.hasOne(models.Order);
    }
  }
  OrderBilling.init({
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderBilling',
    timestamps: true,
  });
  return OrderBilling;
};