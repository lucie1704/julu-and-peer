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
      const cascadeOptions = { onDelete: 'CASCADE', onUpdate: 'CASCADE' };
      
      Customer.belongsTo(models.User, { foreignKey: 'userId',  ...cascadeOptions});
      Customer.hasMany(models.CustomerAddress, { foreignKey: 'customerId', ...cascadeOptions});
      Customer.hasOne(models.Cart, { foreignKey: 'customerId', ...cascadeOptions });
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
    timestamps: true,
    paranoid: true,
    deletedAt: true,
    defaultScope: {
      where: {
        active: true,
      },
    }
  });
  return Customer;
};