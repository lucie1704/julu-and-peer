'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create fake Customers matching Users created before
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
        userId: 4,
        firstName: 'Michael',
        lastName: 'Brown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
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
