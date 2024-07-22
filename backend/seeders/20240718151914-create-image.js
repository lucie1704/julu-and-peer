'use strict';

const { uuidv7 } = require('uuidv7');
const { Product, ProductArtist, Image } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Retrieve all products and artist
    const products = await Product.findAll({limit: 5});
    const artist = await ProductArtist.findOne({ limit: 1 });

    // Check that we have at least one product and one artist
    if (products.length === 0) {
      throw new Error('No products found');
    }

    // Create an array to store image records
    const images = [];

    // Loop through each product
    for (const product of products) {
      // Loop through each artist
          images.push({
            id: uuidv7(),
            width: 1920,
            height: 1080,
            type: 'jpg',
            description: `Image for ${product.name} by ${artist.name}`,
            alt: `Alt text for image ${product.name}`,
            path: `../../public/product/${product.name.replace(/\s+/g, '-').toLowerCase()}-image${artist.name}.jpg`,
            createdAt: new Date(),
            updatedAt: new Date(),
            productId: product.id,
            artistId: artist.id,
          });
    }

    // Insert image records into the database
    await Image.bulkCreate(images,  { individualHooks: true });
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries from the Images table
    await queryInterface.bulkDelete('Images', null, {});
  }
};
