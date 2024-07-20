'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      const cascadeOptions = { onDelete: 'CASCADE', onUpdate: 'CASCADE' };

      Customer.belongsTo(models.User, { foreignKey: 'userId', ...cascadeOptions });
      Customer.hasMany(models.CustomerAddress, { foreignKey: 'customerId', ...cascadeOptions });
      Customer.hasOne(models.Cart, { foreignKey: 'customerId', ...cascadeOptions });
      Customer.hasMany(models.ProductCustomerEvaluation, { foreignKey: 'customerId', ...cascadeOptions });
      Customer.hasMany(models.Promotion, { foreignKey: 'customerId', ...cascadeOptions });
      Customer.hasMany(models.Wishlist, { foreignKey: 'customerId', ...cascadeOptions });
      Customer.hasMany(models.Order, { foreignKey: 'customerId', ...cascadeOptions });
    }
  }

  Customer.init({
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: {
        active: true
      }
    }
  });

  return Customer;
};
