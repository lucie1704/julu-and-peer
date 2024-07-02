'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductFormat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductFormat.hasMany(models.Product, { foreignKey: 'formatId' });
    }
  }
  ProductFormat.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ProductFormat',
    defaultScope: {
      attributes: { exclude:
        [
        'createdAt',
        'updatedAt',
      ]
      },
    },
    timestamps: true,
  });
  return ProductFormat;
};