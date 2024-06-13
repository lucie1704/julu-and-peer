'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('ProductCustomerEvaluations', 'note', 'rating');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('ProductCustomerEvaluations', 'rating', 'note');
  }
};
