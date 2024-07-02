'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethod.belongsTo(models.CustomerAddress, { foreignKey: 'billingAddressId', onDelete: 'CASCADE' });
      PaymentMethod.hasMany(models.OrderBilling);
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    billingAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CustomerAddresses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    timestamps: true,
  });
  return PaymentMethod;
};