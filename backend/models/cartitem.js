'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      CartItem.belongsTo(models.Cart, { 
        foreignKey: 'cartId', 
        onDelete: 'CASCADE' 
      });
      CartItem.belongsTo(models.Product, { 
        foreignKey: 'productId', 
        onDelete: 'CASCADE' 
      });
    }
  }

  CartItem.init({
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 1000,
        min: 1
      },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'CartItem',
    timestamps: true,
  });

  return CartItem;
};
