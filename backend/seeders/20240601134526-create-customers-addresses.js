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
          addressLine1: '123 Rue de Rivoli',
          city: 'Paris',
          postalCode: '75001',
          country: 'France',
          phoneNumber: '01 23 45 67 89',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv7(),
          customerId: customerId,
          addressType: 'Rue',
          addressLine1: '456 Avenue des Champs-Élysées',
          city: 'Paris',
          postalCode: '75008',
          country: 'France',
          phoneNumber: '01 98 76 54 32',
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
