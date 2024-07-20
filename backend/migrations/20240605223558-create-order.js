'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: true
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
      customerAddress: {
        type: Sequelize.UUID,
        references: {
          model: 'CustomerAddresses',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      orderBilling: {
        type: Sequelize.UUID, 
        references: {
          model: 'OrderBillings',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'  
      },
      shipping: {
        type: Sequelize.UUID,
        references: {
          model: 'Shippings',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      customer: {
        type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
