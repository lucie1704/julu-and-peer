'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCustomerEvaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCustomerEvaluation.belongsTo(models.Product, { foreignKey: 'productId' });
      ProductCustomerEvaluation.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  }
  ProductCustomerEvaluation.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
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