'use strict';

const { uuidv7 } = require('uuidv7');
const { Customer, CustomerAddress } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all customers
    const customers = await Customer.findAll({ attributes: ['id'] });

    if (customers.length === 0) {
      throw new Error('No customers found');
    }

    // Extract customer IDs
    const customerIds = customers.map(customer => customer.id);

    // Generate address records
    const addressRecords = [];
    for (const customerId of customerIds) {
      addressRecords.push(
        {
          id: uuidv7(),
          customerId: customerId,
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
          id: uuidv7(),
          customerId: customerId,
          addressType: 'Work',
          addressLine1: '456 Elm Street',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
          phoneNumber: '456-789-0123',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }

    // Insert address records into the database using the CustomerAddress model
    await CustomerAddress.bulkCreate(addressRecords, {
      individualHooks: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the CustomerAddresses table
    await queryInterface.bulkDelete('CustomerAddresses', null, {});
  }
};
