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

    await queryInterface.bulkInsert('CustomerAddresses', [
      {
        customerId: john.id,
        addressType: 'Home',
        addressLine1: '123 Main Street',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        phoneNumber: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: jane.id,
        addressType: 'Home',
        addressLine1: '456 Elm Street',
        city: 'Los Angeles',
        postalCode: '90001',
        country: 'USA',
        phoneNumber: '456-789-0123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: alice.id,
        addressType: 'Home',
        addressLine1: '789 Oak Street',
        city: 'Chicago',
        postalCode: '60601',
        country: 'USA',
        phoneNumber: '789-012-3456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CustomerAddresses', null, {});
  }
};
