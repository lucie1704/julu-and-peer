'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentStatus: {
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
      customerAddress: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CustomerAddresses',
          key: 'id'
        },
        allowNull: false
      },
      orderBilling: {
        type: Sequelize.INTEGER,
        references: {
          model: 'OrderBillings',
          key: 'id'
        },
        allowNull: false
      },
      shipping: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shippings',
          key: 'id'
        },
        allowNull: false
      },
      customer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        },
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};