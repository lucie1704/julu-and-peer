'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderBilling extends Model {
    static associate(models) {
      OrderBilling.belongsTo(models.PaymentMethod, { 
        foreignKey: 'paymentMethodId' 
      });
      OrderBilling.hasOne(models.CustomerOrder, { 
        foreignKey: 'orderBillingId' 
      });
    }
  }

  OrderBilling.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    link: DataTypes.STRING,
    paymentMethodId: {
      type: DataTypes.UUID,
      references: {
        model: 'PaymentMethods',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'OrderBilling',
    timestamps: true
  });

  return OrderBilling;
};
