'use strict';

const { uuidv7 } = require("uuidv7");
const { ProductGenre, ProductFormat, ProductArtist, Product } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Retrieve genres, formats, and artists
    const genres = await ProductGenre.findAll();
    const formats = await ProductFormat.findAll({ limit: 5 });
    const artists = await ProductArtist.findAll({ limit: 5 });

    // Check that we have at least one format and one artist
    if (formats.length === 0 || artists.length === 0) {
      throw new Error('No formats or artists found');
    }

    // Generate product data for each genre, format, and artist 
    const productsData = [];

    // Loop through each format
    for (const format of formats) {
      // Loop through each artist
      for (const artist of artists) {
        // Loop through each genre
        for (const genre of genres) {
          // Create 3 products for each genre-format-artist combination
          for (let i = 0; i < 3; i++) {
            productsData.push({
              id: uuidv7(),
              name: `${genre.name} Product ${i + 1}`,
              description: `A ${genre.name} genre product, number ${i + 1}, by ${artist.name}, available in ${format.name}.`,
              price: (Math.random() * 1000).toFixed(2),
              genreId: genre.id,
              formatId: format.id,
              artistId: artist.id,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }
    }

    // Insert products into the database using bulkCreate on the Product model
    await Product.bulkCreate(productsData, {
      individualHooks: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the Products table
    await queryInterface.bulkDelete('Products', null, {});
  }
};
