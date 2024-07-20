'use strict';

const { uuidv7 } = require('uuidv7');
const { Product, Cart, Customer, CartItem, ProductGenre } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch distinct genres by name
    const genres = await ProductGenre.findAll({
      attributes: ['name', 'id'],
      group: ['name', 'id'],
    });

    if (genres.length === 0) {
      throw new Error('No genres found');
    }

    // Assume you need the first 3 distinct genres for the rest of your logic
    const [firstGenre, secondGenre, thirdGenre] = genres;

    if (!firstGenre || !secondGenre || !thirdGenre) {
      throw new Error('Not enough distinct genres found');
    }

    // Fetch products for each genre
    const products = await Promise.all([
      Product.findOne({ where: { genreId: firstGenre.id } }),
      Product.findOne({ where: { genreId: secondGenre.id } }),
      Product.findOne({ where: { genreId: thirdGenre.id } })
    ]);

    // Fetch 5 customers
    const customers = await Customer.findAll({
      limit: 5
    });

    if (customers.length < 5) {
      throw new Error('Less than 5 customers found');
    }

    // Fetch carts for each customer
    const carts = await Promise.all(customers.map(customer =>
      Cart.findOne({ where: { customerId: customer.id } })
    ));

    // Check if all required records are found
    if (products.some(p => !p) || customers.length < 5 || carts.some(c => !c)) {
      throw new Error('One or more required records not found');
    }

    // Prepare cart items data
    const cartItemsData = [
      { productId: products[0].id, cartId: carts[0].id, quantity: 2 },
      { productId: products[1].id, cartId: carts[0].id, quantity: 1 },
      { productId: products[2].id, cartId: carts[1].id, quantity: 3 },
      { productId: products[0].id, cartId: carts[1].id, quantity: 1 },
      { productId: products[1].id, cartId: carts[2].id, quantity: 3 }
    ];

    // Map cart items data to include required fields
    const cartItemsRecords = cartItemsData.map(item => ({
      id: uuidv7(),
      productId: item.productId,
      cartId: item.cartId,
      quantity: item.quantity,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Use CartItems.bulkCreate to insert the cart items into the database
    await CartItem.bulkCreate(cartItemsRecords, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the CartItems table
    await queryInterface.bulkDelete('CartItems', null, {});
  }
};
