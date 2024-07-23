'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Cart.belongsTo(models.Customer, { 
        foreignKey: 'customerId', 
        onDelete: 'CASCADE' 
      });
      Cart.hasMany(models.CartItem, { 
        foreignKey: 'cartId', 
        onDelete: 'CASCADE' 
      });
    }
  }
  
  Cart.init({
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
  });

  return Cart;
};
