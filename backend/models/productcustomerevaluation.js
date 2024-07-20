'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCustomerEvaluation extends Model {
    static associate(models) {
      ProductCustomerEvaluation.belongsTo(models.Product, { foreignKey: 'productId' });
      ProductCustomerEvaluation.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  }

  ProductCustomerEvaluation.init({
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false
    },
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      },
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'ProductCustomerEvaluation',
    timestamps: true,
  });

  return ProductCustomerEvaluation;
};
