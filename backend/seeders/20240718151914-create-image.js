'use strict';

const { uuidv7 } = require('uuidv7');
const { Product, ProductArtist, Image } = require('../models');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/public/product/' : 'https://juluandpeer.store/product';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Retrieve all products and artist
    const products = await Product.findAll();
    const artist = await ProductArtist.findOne({ limit: 1 });

    // Check that we have at least one product and one artist
    if (products.length === 0) {
      throw new Error('No products found');
    }

    // Create an array to store image records
    const images = [];
    const existingImages = ['default_product.jpg', 'old-vinyl.jpg', 'vinyl-colors.png', 'vinyl-jazz-collection.png', 'vinyl-pochette.png', 'vinyl-red.png', 'vinyle-classic-rock.png', 'vinyle-img.png']

    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * existingImages.length);
      return existingImages[randomIndex];
    };

    // Loop through each product
    for (const product of products) {
      const randomImage = getRandomImage();
      // Loop through each product
          images.push({
            id: uuidv7(),
            width: 1920,
            height: 1080,
            type: 'jpg',
            description: `Image for ${product.name} by ${artist.name}`,
            alt: `Alt text for image ${product.name}`,
            path: `${base_url}/${randomImage}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            productId: product.id,
            artistId: artist.id,
          });
    }

    // Insert image records into the database
    await Image.bulkCreate(images,  { individualHooks: true });
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries from the Images table
    await queryInterface.bulkDelete('Images', null, {});
  }
};
