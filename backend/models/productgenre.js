'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductGenre.hasMany(models.Product, { foreignKey: 'genreId' });
    }
  }
  ProductGenre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ProductGenre',
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
  return ProductGenre;
};