'use strict';

const { uuidv7 } = require("uuidv7");
const { ProductGenre } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genres = [
      { name: 'Rock', description: 'A genre of popular music that originated as "rock and roll".' },
      { name: 'Jazz', description: 'A music genre that originated in the African-American communities.' },
      { name: 'Pop', description: 'A genre of popular music that originated in its modern form.' },
      { name: 'Classical', description: 'A genre of music that is rooted in the traditions of Western culture.' },
      { name: 'Hip-Hop', description: 'A genre of popular music developed in the United States by inner-city African Americans.' },
      { name: 'Electronic', description: 'A genre of music that employs electronic musical instruments and digital technology.' },
      { name: 'Country', description: 'A genre of popular music that originated with blues, old-time music, and various types of American folk music.' },
      { name: 'Reggae', description: 'A music genre that originated in Jamaica in the late 1960s.' },
      { name: 'Blues', description: 'A genre of music that originated in the Deep South of the United States around the end of the 19th century.' },
      { name: 'Metal', description: 'A genre of rock music that developed in the late 1960s and early 1970s, largely in the United Kingdom and the United States.' }
    ];

    const productGenres = genres.map(genre => ({
      id: uuidv7(),
      name: genre.name,
      description: genre.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await ProductGenre.bulkCreate(productGenres, { individualHooks: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductGenres', null, {});
  }
};
