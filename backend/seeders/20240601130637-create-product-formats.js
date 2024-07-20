'use strict';
const { uuidv7 } = require("uuidv7");
const { ProductFormat } = require('../models'); // Adjust the path as necessary

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formats = [
      { name: 'CD', description: 'Compact Disc' },
      { name: 'Vinyl 7"', description: '7-inch Vinyl Record' },
      { name: 'Vinyl 10"', description: '10-inch Vinyl Record' },
      { name: 'Vinyl 12"', description: '12-inch Vinyl Record' },
      { name: 'Vinyl LP', description: 'Long Play Vinyl Record' },
      { name: 'Vinyl EP', description: 'Extended Play Vinyl Record' }
    ];

    const formatRecords = formats.map(format => ({
      id: uuidv7(),
      name: format.name,
      description: format.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await ProductFormat.bulkCreate(formatRecords,  { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductFormats', null, {});
  }
};
