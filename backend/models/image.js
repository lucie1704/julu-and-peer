'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, {
        foreignKey: {
          allowNull: true
        }
      });
      Image.belongsTo(models.ProductArtist, {
        foreignKey: {
          allowNull: true
        }
      });
    }
  }
  Image.init({
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    alt: DataTypes.TEXT,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
    timestamps: true,
  });
  return Image;
};