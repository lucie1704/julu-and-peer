'use strict';
const { Product, Cart, Customer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [guitar, piano, electro] = await Promise.all([
      Product.findOne({ where: { name: 'Guitar' } }),
      Product.findOne({ where: { name: 'Piano' } }),
      Product.findOne({ where: { name: 'Electro' } })
  ]);

    const [john, jane, alice] = await Promise.all([
      Customer.findOne({ where: { firstName: 'John' } }),
      Customer.findOne({ where: { firstName: 'Jane' } }),
      Customer.findOne({ where: { firstName: 'Alice' } })
  ]);

  const [johnCart, janeCart, alicecart] = await Promise.all([
    Cart.findOne({ where: { customerId: john.id } }),
    Cart.findOne({ where: { customerId: jane.id } }),
    Cart.findOne({ where: { customerId: alice.id } })
]);

    await queryInterface.bulkInsert('CartItems', [
      {
        productId: guitar.id,
        cartId: johnCart.id,
        quantity: 2,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: piano.id,
        cartId: johnCart.id,
        quantity: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: electro.id,
        cartId: janeCart.id,
        quantity: 3,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: guitar.id,
        cartId: janeCart.id,
        quantity: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: piano.id,
        cartId: alicecart.id,
        quantity: 3,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CartItems', null, {});
  }
};
