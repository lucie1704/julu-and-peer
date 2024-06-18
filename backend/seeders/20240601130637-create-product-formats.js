'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductFormats', [
      {
        name: 'CD',
        description: 'Compact Disc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vinyl',
        description: 'Vinyl Record',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Digital',
        description: 'Digital Download',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductFormats', null, {});
  }
};
