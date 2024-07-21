'use strict';
const { uuidv7 } = require('uuidv7');
const { OrderBilling, PaymentMethod } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const paymentMethods = await PaymentMethod.findAll();

    const ordersBillings = [
      {
        id: uuidv7(),
        link: "idk1",
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethodId: paymentMethods[0].id
      },
      {
        id: uuidv7(),
        link: "idk2",
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethodId: paymentMethods[1].id
      }
    ];

    await OrderBilling.bulkCreate(ordersBillings,  { individualHooks: true });
  },

  async down (queryInterface, Sequelize) {

  }
};
