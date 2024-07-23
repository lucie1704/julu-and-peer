'use strict';
const { uuidv7 } = require("uuidv7");
const { ProductArtist } = require('../models'); // Adjust the path as necessary

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define a list of 30 artists
    const artistNames = [
      'The Beatles', 'Miles Davis', 'Taylor Swift', 'Led Zeppelin', 'Beyoncé', 
      'Nina Simone', 'Bob Dylan', 'Elvis Presley', 'Madonna', 'David Bowie',
      'Kurt Cobain', 'Adele', 'Billie Eilish', 'Elton John', 'Frank Sinatra',
      'Aretha Franklin', 'Stevie Wonder', 'Jimi Hendrix', 'The Rolling Stones',
      'Queen', 'Bruce Springsteen', 'Prince', 'Shakira', 'Lady Gaga', 
      'The Weeknd', 'Eminem', 'Kanye West', 'Rihanna', 'Drake', 'Sia', 
      'Ed Sheeran', 'Post Malone', 'Katy Perry', 'Dua Lipa', 'Sam Smith'
    ];

    // Map artist names to objects with UUIDs and other properties
    const artists = artistNames.map(name => ({
      id: uuidv7(),
      name,
      description: `${name} est un artiste bien connu.`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Use bulkCreate with individualHooks option
    await ProductArtist.bulkCreate(artists, {
      individualHooks: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all records from the ProductArtists table
    await queryInterface.bulkDelete('ProductArtists', null, {});
  }
};
