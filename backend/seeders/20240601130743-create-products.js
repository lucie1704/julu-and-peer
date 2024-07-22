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
            productsData.push({
              id: uuidv7(),
              name: `Vinyle ${genre.name} ${artist.name}`,
              description: `Un produit du genre ${genre.name}, par ${artist.name}, disponible en ${format.name}.`,
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

    // Adding products with customized descriptions
    productsData.push({
      id: uuidv7(),
      name: `Vinyl Collector Edition`,
      description: `Un vinyle unique en édition collector, parfait pour les amateurs de musique. Ce produit offre une qualité sonore exceptionnelle et un packaging élégant. Disponible exclusivement en édition limitée.`,
      price: (Math.random() * 1000).toFixed(2),
      genreId: genres[0].id,
      formatId: formats[0].id,
      artistId: artists[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    productsData.push({
      id: uuidv7(),
      name: `CD de Compilation Jazz`,
      description: `Ce CD de compilation réunit les meilleures performances de jazz de différents artistes. Une sélection soigneusement choisie pour offrir une expérience auditive enrichissante. Idéal pour les soirées détendues et les amateurs de jazz.`,
      price: (Math.random() * 1000).toFixed(2),
      genreId: genres[1].id,
      formatId: formats[1].id,
      artistId: artists[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    productsData.push({
      id: uuidv7(),
      name: `Album Pop Hit`,
      description: `Découvrez les hits pop les plus populaires avec cet album incontournable. Chaque chanson est un succès garanti, offrant des mélodies accrocheuses et des rythmes entraînants. Un must-have pour tous les fans de musique pop.`,
      price: (Math.random() * 1000).toFixed(2),
      discount: 12,
      genreId: genres[2].id,
      formatId: formats[2].id,
      artistId: artists[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Adding products with discounts
    for (let i = 0; i < 3; i++) {
      productsData.push({
        id: uuidv7(),
        name: `Produit avec discount ${i + 1}`,
        description: `Un produit disponible en vinyl 80.`,
        price: (Math.random() * 1000).toFixed(2),
        discount: 20.5,
        genreId: genres[1].id,
        formatId: formats[1].id,
        artistId: artists[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
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
