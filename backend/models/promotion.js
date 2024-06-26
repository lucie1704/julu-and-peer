'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.belongsTo(models.Customer);
    }
  }
  Promotion.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    pourcentageOff: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promotion',
    timestamps: true,
  });
  return Promotion;
};