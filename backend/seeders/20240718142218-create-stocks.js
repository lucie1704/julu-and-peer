'use strict';

const { uuidv7 } = require('uuidv7');
const { Product, Stock } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all product IDs
    const products = await Product.findAll({ attributes: ['id'] });

    if (products.length === 0) {
      throw new Error('No products found');
    }

    // Extract product IDs
    const productIds = products.map(product => product.id);

    // Generate stock records for each product ID
    const stocks = productIds.flatMap(productId => [
      {
        id: uuidv7(),
        productId,
        type: 'plus',
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv7(),
        productId,
        type: 'minus',
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv7(),
        productId,
        type: 'minus',
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await Stock.bulkCreate(stocks,  { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the Stock table
    await queryInterface.bulkDelete('Stocks', null, {});
  }
};
