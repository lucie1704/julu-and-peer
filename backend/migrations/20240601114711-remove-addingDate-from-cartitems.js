'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CartItems', 'addingDate');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('CartItems', 'addingDate', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
