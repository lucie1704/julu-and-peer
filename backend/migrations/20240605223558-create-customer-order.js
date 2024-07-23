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
        type: Sequelize.ARRAY(DataTypes.JSON),
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shippingInfo: {
        type: Sequelize.JSON
      },
      billingInfo: {
        type: Sequelize.JSON
      },
      deliveryStatus: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
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
        type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      customerAddressId: {
        type: Sequelize.UUID,
        references: {
          model: 'CustomerAddresses',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      orderBillingId: {
        type: Sequelize.UUID, 
        references: {
          model: 'OrderBillings',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'  
      },
      shippingId: {
        type: Sequelize.UUID,
        references: {
          model: 'Shippings',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CustomerOrders');
  }
};
