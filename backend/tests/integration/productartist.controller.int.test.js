const request = require('supertest');
const app = require('../../app');
const { ProductArtist, Product } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const artistId = uuidv4();

describe('Tests d\'intégration pour le controller des artistes', () => {
    beforeAll(async () => {
        // TODO : Quelque chose pour la DB Test ?
    });

    afterAll(async () => {
        // Nettoyage de la base de données après tous les tests
        // await ProductArtist.destroy({ where: {} });
        // await Product.destroy({ where: {} });
    });
    
    it('devrait tester le fichier d\'intégration pour l\'artiste', async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer un nouveau artiste', async () => {
    //     const response = await request(app)
    //         .post('/artists')
    //         .send({ name: 'Nouveau Artiste', description: 'Artiste prometteur' });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.name).toBe('Nouveau Artiste');
    //     expect(response.body.description).toBe('Artiste prometteur');
    // });

    // it('devrait obtenir tous les artistes', async () => {
    //     await ProductArtist.create({ name: 'Artiste 1', description: 'Description 1' });
    //     await ProductArtist.create({ name: 'Artiste 2', description: 'Description 2' });

    //     const response = await request(app).get('/artists');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body.data.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir un artiste par UUID', async () => {
    //     const artist = await ProductArtist.create({ id: artistId, name: 'Artiste Unique', description: 'Description Unique' });

    //     const response = await request(app).get(`/artists/${artistId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', artistId);
    //     expect(response.body.name).toBe('Artiste Unique');
    //     expect(response.body.description).toBe('Description Unique');
    // });

    // it('devrait mettre à jour un artiste', async () => {
    //     await ProductArtist.create({ id: artistId, name: 'Artiste à mettre à jour', description: 'Ancienne description' });

    //     const response = await request(app)
    //         .put(`/artists/${artistId}`)
    //         .send({ name: 'Artiste Mis à Jour', description: 'Description mise à jour' });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', artistId);
    //     expect(response.body.name).toBe('Artiste Mis à Jour');
    //     expect(response.body.description).toBe('Description mise à jour');
    // });

    // it('devrait supprimer un artiste', async () => {
    //     await ProductArtist.create({ id: artistId, name: 'Artiste à supprimer', description: 'Description à supprimer' });

    //     const response = await request(app).delete(`/artists/${artistId}`);

    //     expect(response.status).toBe(204);

    //     const artist = await ProductArtist.findByPk(artistId);
    //     expect(artist).toBeNull();
    // });

    // it('ne devrait pas supprimer un artiste si des produits sont associés', async () => {
    //     const artist = await ProductArtist.create({ id: artistId, name: 'Artiste associé', description: 'Description associée' });
    //     await Product.create({
    //         name: 'Produit Test',
    //         description: 'Description du produit',
    //         price: 10.99,
    //         artistId: artistId
    //     });

    //     const response = await request(app).delete(`/artists/${artistId}`);

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'Vous ne pouvez pas supprimer un artiste qui est encore associé a des produits.');
    // });

    // it('devrait retourner un objet avec des valeurs par défaut dans options', async () => {
    //     const response = await request(app).options('/artists');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('name', '');
    //     expect(response.body).toHaveProperty('description', '');
    // });
});
