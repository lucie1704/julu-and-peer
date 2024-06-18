'use strict';
const { ProductGenre, ProductFormat, ProductArtist } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [genre, format, artist] = await Promise.all([
      ProductGenre.findOne({ where: { name: 'Rock' } }),
      ProductFormat.findOne({ where: { name: 'Digital' } }),
      ProductArtist.findOne({ where: { name: 'The Beatles' } })
    ]);

    const productsData = [
      {
        name: 'Guitar',
        description: 'A musical instrument typically made of wood with six strings and played with fingers or a plectrum.',
        price: 499.99,
        availableStock: 100,
        genreId: genre.id ,
        formatId: format.id,
        artistId: artist.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Piano',
        description: 'A large keyboard musical instrument with a wooden case enclosing a soundboard and metal strings, which are struck by hammers when the keys are depressed.',
        price: 1499.99,
        availableStock: 50,
        genreId: genre.id,
        formatId: format.id,
        artistId: artist.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electro',
        description: 'A large keyboard musical instrument with a wooden case enclosing a soundboard and metal strings, which are struck by hammers when the keys are depressed.',
        price: 1499.99,
        availableStock: 50,
        genreId: genre.id,
        formatId: format.id,
        artistId: artist.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Products', productsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
