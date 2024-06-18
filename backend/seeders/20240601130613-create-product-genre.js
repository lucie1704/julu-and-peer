'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductGenres', [
      {
        name: 'Rock',
        description: 'A genre of popular music that originated as "rock and roll".',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jazz',
        description: 'A music genre that originated in the African-American communities.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pop',
        description: 'A genre of popular music that originated in its modern form.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductGenres', null, {});
  }
};
