'use strict';

const { uuidv7 } = require("uuidv7");
const { ProductGenre } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genres = [
      { name: 'Rock', description: 'Un genre de musique populaire qui a pris naissance sous le nom de "rock and roll".' },
      { name: 'Jazz', description: 'Un genre musical qui a pris naissance dans les communautés afro-américaines.' },
      { name: 'Pop', description: 'Un genre de musique populaire qui a pris naissance sous sa forme moderne.' },
      { name: 'Classique', description: 'Un genre de musique qui est enraciné dans les traditions de la culture occidentale.' },
      { name: 'Hip-Hop', description: 'Un genre de musique populaire développé aux États-Unis par les Afro-Américains des quartiers défavorisés.' },
      { name: 'Électronique', description: 'Un genre de musique qui utilise des instruments de musique électroniques et la technologie numérique.' },
      { name: 'Country', description: 'Un genre de musique populaire qui a ses origines dans le blues, la musique traditionnelle et divers types de musique folk américaine.' },
      { name: 'Reggae', description: 'Un genre de musique qui a pris naissance en Jamaïque à la fin des années 1960.' },
      { name: 'Blues', description: 'Un genre de musique qui a pris naissance dans le Deep South des États-Unis vers la fin du XIXe siècle.' },
      { name: 'Metal', description: 'Un genre de musique rock qui s\'est développé à la fin des années 1960 et au début des années 1970, principalement au Royaume-Uni et aux États-Unis.' }
    ];

    const productGenres = genres.map(genre => ({
      id: uuidv7(),
      name: genre.name,
      description: genre.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await ProductGenre.bulkCreate(productGenres, { individualHooks: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductGenres', null, {});
  }
};
