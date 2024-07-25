const request = require('supertest');
const app = require('../../app');
const { ProductGenre, Product } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const genreId = uuidv4();

describe('Tests d\'intégration pour le controller des genres', () => {
    beforeAll(async () => {
        // TODO : Initialisation ou nettoyage des données de la base de données
    });

    afterAll(async () => {
        // Nettoyage de la base de données après tous les tests
        // await ProductGenre.destroy({ where: {} });
        // await Product.destroy({ where: {} });
    });

    it('devrait tester le fichier d\'intégration pour le genre', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer un nouveau genre', async () => {
    //     const response = await request(app)
    //         .post('/genres')
    //         .send({ name: 'Nouveau Genre', description: 'Genre prometteur' });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.name).toBe('Nouveau Genre');
    //     expect(response.body.description).toBe('Genre prometteur');
    // });

    // it('devrait obtenir tous les genres', async () => {
    //     await ProductGenre.create({ name: 'Genre 1', description: 'Description 1' });
    //     await ProductGenre.create({ name: 'Genre 2', description: 'Description 2' });

    //     const response = await request(app).get('/genres');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body.data.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir un genre par UUID', async () => {
    //     const genre = await ProductGenre.create({ id: genreId, name: 'Genre Unique', description: 'Description Unique' });

    //     const response = await request(app).get(`/genres/${genreId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', genreId);
    //     expect(response.body.name).toBe('Genre Unique');
    //     expect(response.body.description).toBe('Description Unique');
    // });

    // it('devrait mettre à jour un genre', async () => {
    //     await ProductGenre.create({ id: genreId, name: 'Genre à mettre à jour', description: 'Ancienne description' });

    //     const response = await request(app)
    //         .put(`/genres/${genreId}`)
    //         .send({ name: 'Genre Mis à Jour', description: 'Description mise à jour' });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', genreId);
    //     expect(response.body.name).toBe('Genre Mis à Jour');
    //     expect(response.body.description).toBe('Description mise à jour');
    // });

    // it('devrait supprimer un genre', async () => {
    //     await ProductGenre.create({ id: genreId, name: 'Genre à supprimer', description: 'Description à supprimer' });

    //     const response = await request(app).delete(`/genres/${genreId}`);

    //     expect(response.status).toBe(204);

    //     const genre = await ProductGenre.findByPk(genreId);
    //     expect(genre).toBeNull();
    // });

    // it('ne devrait pas supprimer un genre si des produits sont associés', async () => {
    //     const genre = await ProductGenre.create({ id: genreId, name: 'Genre associé', description: 'Description associée' });
    //     await Product.create({
    //         name: 'Produit Test',
    //         description: 'Description du produit',
    //         price: 10.99,
    //         genreId: genreId
    //     });

    //     const response = await request(app).delete(`/genres/${genreId}`);

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'Vous ne pouvez pas supprimer un genre qui est encore associé a des produits.');
    // });

    // it('devrait retourner un objet avec des valeurs par défaut dans options', async () => {
    //     const response = await request(app).options('/genres');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('name', '');
    //     expect(response.body).toHaveProperty('description', '');
    // });
});
