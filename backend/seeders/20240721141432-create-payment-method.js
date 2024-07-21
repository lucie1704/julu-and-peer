'use strict';

const { uuidv7 } = require('uuidv7');
const { PaymentMethod, CustomerAddress } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const customerAddresses = await CustomerAddress.findAll({
      limit:2
    });

    const paymentMethods = [
      {
        id: uuidv7(),
        type: 'debit_card',
        cardHolderName: 'ERWANN JOUVET',
        cardExpireDate: new Date('2025-01-01'),
        cardNumber: '1234 4321 5678 8765',
        cvv: '000',
        billingAddressId: customerAddresses[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv7(),
        type: 'debit_card',
        cardHolderName: 'PEDRO DA SILVA SOUSA',
        cardExpireDate: new Date('2026-01-15'),
        cardNumber: '4321 4321 8765 8765',
        cvv: '111',
        billingAddressId: customerAddresses[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    await PaymentMethod.bulkCreate(paymentMethods,  { individualHooks: true });
  },

  async down (queryInterface, Sequelize) {
  }
};
