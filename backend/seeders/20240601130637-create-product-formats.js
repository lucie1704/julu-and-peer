'use strict';
const { uuidv7 } = require("uuidv7");
const { ProductFormat } = require('../models'); // Ajustez le chemin si nécessaire

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formats = [
      { name: 'CD', description: 'Compact Disc' },
      { name: 'Vinyle 7"', description: 'Disque vinyle de 7 pouces' },
      { name: 'Vinyle 10"', description: 'Disque vinyle de 10 pouces' },
      { name: 'Vinyle 12"', description: 'Disque vinyle de 12 pouces' },
      { name: 'LP', description: 'Long Play (Disque vinyle de longue durée)' },
      { name: 'EP', description: 'Extended Play (Disque vinyle à durée étendue)' }
    ];

    const formatRecords = formats.map(format => ({
      id: uuidv7(),
      name: format.name,
      description: format.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await ProductFormat.bulkCreate(formatRecords, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductFormats', null, {});
  }
};
