'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductArtists', [
      {
        name: 'The Beatles',
        description: 'An English rock band formed in Liverpool in 1960.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Miles Davis',
        description: 'An American trumpeter, bandleader, and composer.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taylor Swift',
        description: 'An American singer-songwriter.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductArtists', null, {});
  }
};
