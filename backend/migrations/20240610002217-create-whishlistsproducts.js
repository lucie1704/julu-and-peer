'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WishlistsProducts', {
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
      wishlist: {
        type: Sequelize.UUID, 
        references: {
          model: 'Wishlists',
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WishlistsProducts');
  }
};
