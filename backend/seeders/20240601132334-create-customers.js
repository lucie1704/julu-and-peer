'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting fake customers
    await queryInterface.bulkInsert('Customers', [
      {
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        firstName: 'Michael',
        lastName: 'Brown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        firstName: 'Emily',
        lastName: 'Taylor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
