'use strict';

const { uuidv7 } = require('uuidv7');
const { User, Customer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch 15 user IDs
    const users = await User.findAll({ attributes: ['id'], limit: 15 });

    // Ensure that there are enough users
    if (users.length < 15) {
      throw new Error('Not enough users found for creating customers.');
    }

    // Map user IDs to a list
    const userIds = users.map(user => user.id);

    // Generate 15 customers
    const customersData = userIds.map((userId, index) => ({
      id: uuidv7(),
      userId: userId,
      firstName: `FirstName${index + 1}`,
      lastName: `LastName${index + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Use Customer.bulkCreate to insert the customers into the database
    await Customer.bulkCreate(customersData, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the Customers table
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
