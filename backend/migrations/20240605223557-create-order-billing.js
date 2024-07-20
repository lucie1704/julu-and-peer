'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderBillings', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      link: {
        type: Sequelize.STRING,
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
      paymentMethod: {
        type: Sequelize.UUID,
        references: {
          model: 'PaymentMethods',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderBillings');
  }
};
