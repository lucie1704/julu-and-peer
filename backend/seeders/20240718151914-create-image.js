'use strict';
const {Product} = require('../models');
const {ProductArtist} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [guitar, piano, TheBeatles, TaylorSwift] = await Promise.all([
      Product.findOne({ where: { name: 'Guitar' } }),
      Product.findOne({ where: { name: 'Piano' } }),
      ProductArtist.findOne({ where: { name: 'The Beatles' } }),
      ProductArtist.findOne({ where: { name: 'Taylor Swift' } }),
    ]);

    const images = [
      {
        width: 60,
        height: 60,
        type: "jpg",
        description: "ceci est la description 1",
        alt: "ceci est la balise alt 1",
        path: "../public/img/users/default.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: guitar.id,
        artistId: TheBeatles.id,
      },
      {
        width: 240,
        height: 240,
        type: "jpg",
        description: "ceci est la description 2",
        alt: "ceci est la balise alt 2",
        path: "../public/img/users/default.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: piano.id,
        artistId: TaylorSwift.id,
      },
      {
        width: 1920,
        height: 1080,
        type: "jpg",
        description: "ceci est la description 3",
        alt: "ceci est la balise alt 3",
        path: "../public/img/users/default.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: piano.id,
        artistId: null,
      },
      {
        width: 1920,
        height: 1080,
        type: "jpg",
        description: "ceci est la description 4",
        alt: "ceci est la balise alt 4",
        path: "../public/img/users/default.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: null,
        artistId: TaylorSwift.id,
      },
    ]
    await queryInterface.bulkInsert('Images', images, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
