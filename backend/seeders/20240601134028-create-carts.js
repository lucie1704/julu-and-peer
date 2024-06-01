'use strict';
const { Customer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const [john, jane, alice] = await Promise.all([
        Customer.findOne({ where: { firstName: 'John' } }),
        Customer.findOne({ where: { firstName: 'Jane' } }),
        Customer.findOne({ where: { firstName: 'Alice' } })
    ]);

    await queryInterface.bulkInsert('Carts', [
      {
        customerId: john.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: jane.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: alice.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
