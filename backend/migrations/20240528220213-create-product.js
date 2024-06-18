'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      availableStock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductGenres',
          key: 'id'
        }
      },
      formatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductFormats',
          key: 'id'
        }
      },
      artistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductArtists',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      imageSrc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      imageAlt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reviewCount: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};