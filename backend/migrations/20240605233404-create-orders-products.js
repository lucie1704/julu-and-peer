'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdersProducts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      priceWhenOrdering: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.UUID, 
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      product: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' 
      },
      orderItemReturn: {
        type: Sequelize.UUID, 
        references: {
          model: 'OrderItemReturns',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'SET NULL'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrdersProducts');
  }
};
