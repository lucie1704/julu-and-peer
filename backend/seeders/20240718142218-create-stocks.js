'use strict';
const {Product} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [guitar, piano] = await Promise.all([
      Product.findOne({ where: { name: 'Guitar' } }),
      Product.findOne({ where: { name: 'Piano' } }),
    ]);

    const stocks = [
      {
        productId: guitar.id,
        type: "plus",
        quantity : 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: guitar.id,
        type: "minus",
        quantity : 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: guitar.id,
        type: "minus",
        quantity : 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: piano.id,
        type: "plus",
        quantity : 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: piano.id,
        type: "minus",
        quantity : 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Stocks', stocks, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Stocks', null, {});
  }
};
