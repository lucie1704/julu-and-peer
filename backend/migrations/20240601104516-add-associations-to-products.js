'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'genreId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'ProductGenres',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Products', 'formatId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'ProductFormats',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Products', 'artistId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'ProductArtists',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'genreId');
    await queryInterface.removeColumn('Products', 'formatId');
    await queryInterface.removeColumn('Products', 'artistId');
  }
};
