'use strict';

const { uuidv7 } = require('uuidv7');
const { Customer, Cart } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all customers
    const customers = await Customer.findAll({ attributes: ['id'] });

    if (customers.length === 0) {
      throw new Error('No customers found');
    }

    // Generate cart records
    const cartRecords = [];
    for (const customer of customers) {
      for (let i = 1; i <= 2; i++) {
        cartRecords.push({
          id: uuidv7(),
          customerId: customer.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Insert cart records into the database
    await Cart.bulkCreate(cartRecords, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the Carts table
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
