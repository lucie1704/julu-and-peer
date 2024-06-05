'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CustomerOrders', 'customerId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CustomerOrders', 'customerId');
  }
};
