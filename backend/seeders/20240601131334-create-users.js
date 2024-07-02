'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(12);

    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        photo: 'default.jpg',
        role: 'user',
        password: await bcrypt.hash('john.password123!', salt),
        passwordConfirmation: await bcrypt.hash('john.password123!', salt),
        passwordChangedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        photo: 'default.jpg',
        role: 'user',
        password: await bcrypt.hash('jane.password123!', salt),
        passwordConfirmation: await bcrypt.hash('jane.password123!', salt),
        passwordChangedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Alice',
        lastname: 'Johnson',
        email: 'alice.johnson@example.com',
        photo: 'default.jpg',
        role: 'user',
        password: await bcrypt.hash('alice.password123!', salt),
        passwordConfirmation: await bcrypt.hash('alice.password123!', salt),
        passwordChangedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Michael',
        lastname: 'Brown',
        email: 'michael.brown@example.com',
        photo: 'default.jpg',
        role: 'user',
        password: await bcrypt.hash('michael.password123!', salt),
        passwordConfirmation: await bcrypt.hash('michael.password123!!', salt),
        passwordChangedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Emily',
        lastname: 'Taylor',
        email: 'emily.taylor@example.com',
        photo: 'default.jpg',
        role: 'user',
        password: await bcrypt.hash('emily.password123!', salt),
        passwordConfirmation: await bcrypt.hash('emily.password123!', salt),
        passwordChangedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};