'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('credit_card', 'debit_card', 'paypal', 'stripe'),
        allowNull: false
      },
      cardHolderName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardExpireDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      billingAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'CustomerAddresses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentMethods');
  }
};
