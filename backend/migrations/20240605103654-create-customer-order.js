'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerOrders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      products: {
        type: Sequelize.ARRAY(DataTypes.UUID),
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      shippingInfo: {
        type: Sequelize.JSON
      },
      deliveryStatus: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      customerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CustomerOrders');
  }
};
