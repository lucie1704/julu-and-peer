'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'imageSrc', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Products', 'imageAlt', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'imageSrc');
    await queryInterface.removeColumn('Products', 'imageAlt');
  }
};
