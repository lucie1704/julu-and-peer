'use strict';

const bcrypt = require('bcryptjs');
const { uuidv7 } = require('uuidv7');
const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Base users with unique emails and names
    const baseUsers = [
      { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
      { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com' },
      { firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com' },
      { firstname: 'Michael', lastname: 'Brown', email: 'michael.brown@example.com' },
      { firstname: 'Emily', lastname: 'Taylor', email: 'emily.taylor@example.com' },
      { firstname: 'James', lastname: 'Wilson', email: 'james.wilson@example.com' },
      { firstname: 'Olivia', lastname: 'Moore', email: 'olivia.moore@example.com' },
      { firstname: 'Liam', lastname: 'Anderson', email: 'liam.anderson@example.com' },
      { firstname: 'Sophia', lastname: 'Thomas', email: 'sophia.thomas@example.com' },
      { firstname: 'Lucas', lastname: 'White', email: 'lucas.white@example.com' },
      { firstname: 'Emma', lastname: 'Harris', email: 'emma.harris@example.com' },
      { firstname: 'Noah', lastname: 'Martin', email: 'noah.martin@example.com' },
      { firstname: 'Isabella', lastname: 'Garcia', email: 'isabella.garcia@example.com' },
      { firstname: 'Aiden', lastname: 'Rodriguez', email: 'aiden.rodriguez@example.com' },
      { firstname: 'Mia', lastname: 'Lewis', email: 'mia.lewis@example.com' },
      // Add admin user
      { firstname: 'Admin', lastname: 'Peer', email: 'admin@juluandpeer.com', role: 'admin' },
    ];

    // Common attributes
    const commonAttributes = {
      role: 'user',
      emailConfirmed: true,
      passwordChangedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create user records with hashed passwords
    const userRecords = await Promise.all(baseUsers.map(async (user) => {

      return {
        id: uuidv7(),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role || commonAttributes.role,
        emailConfirmed: commonAttributes.emailConfirmed,
        password: "Password123@",
        passwordConfirmation:  "Password123@",
        createdAt: commonAttributes.createdAt,
        updatedAt: commonAttributes.updatedAt
      };
    }));

    // Use User.bulkCreate to insert the users into the database
    await User.bulkCreate(userRecords, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries from the Users table
    await queryInterface.bulkDelete('Users', null, {});
  }
};
