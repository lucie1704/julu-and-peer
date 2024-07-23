'use strict';

const { uuidv7 } = require('uuidv7');
const { Shipping } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const shippings = [
      {
        id: uuidv7(),
        trackNumber: "fzu23feiof343oofe34",
        shippingDate: new Date('2024-06-17'),
        receiptDate: new Date('2024-06-21'),
        status: "delivered",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv7(),
        trackNumber: "fzu23fefbfl85e34",
        shippingDate: new Date(),
        receiptDate: null,
        status: "on delivery",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await Shipping.bulkCreate(shippings,  { individualHooks: true });
  },

  async down (queryInterface, Sequelize) {
  }
};
