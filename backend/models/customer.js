'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, { foreignKey: 'userId' });
      Customer.hasMany(models.CustomerAddress, { foreignKey: 'customerId' });
      Customer.hasOne(models.Cart, { foreignKey: 'customerId' });
      Customer.hasMany(models.Promotion);
      Customer.hasMany(models.Wishlist);
      Customer.hasMany(models.Order);
    }
  }
  Customer.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};