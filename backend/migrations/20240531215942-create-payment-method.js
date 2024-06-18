'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cvv: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      billingAddressId: {
        type: Sequelize.INTEGER,
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