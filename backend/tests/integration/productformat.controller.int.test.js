const request = require('supertest');
const app = require('../../app');
const { ProductFormat, Product } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const formatId = uuidv4();

describe('Tests d\'intégration pour le controller des formats', () => {
    beforeAll(async () => {
        // TODO : Quelque chose pour la DB Test ?
    });

    afterAll(async () => {
        // Nettoyage de la base de données
        // await ProductFormat.destroy({ where: {} });
        // await Product.destroy({ where: {} });
    });
    
    it("devrait tester le fichier d'intégration pour le format", async () => {
        expect(1).toBe(1);
    });

    // it('devrait créer un nouveau format', async () => {
    //     const response = await request(app)
    //         .post('/formats')
    //         .send({ name: 'Nouveau Format', description: 'Format prometteur' });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.name).toBe('Nouveau Format');
    //     expect(response.body.description).toBe('Format prometteur');
    // });

    // it('devrait obtenir tous les formats', async () => {
    //     await ProductFormat.create({ name: 'Format 1', description: 'Description 1' });
    //     await ProductFormat.create({ name: 'Format 2', description: 'Description 2' });

    //     const response = await request(app).get('/formats');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body.data.length).toBeGreaterThan(0);
    // });

    // it('devrait obtenir un format par UUID', async () => {
    //     const format = await ProductFormat.create({ id: formatId, name: 'Format Unique', description: 'Description Unique' });

    //     const response = await request(app).get(`/formats/${formatId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', formatId);
    //     expect(response.body.name).toBe('Format Unique');
    //     expect(response.body.description).toBe('Description Unique');
    // });

    // it('devrait mettre à jour un format', async () => {
    //     await ProductFormat.create({ id: formatId, name: 'Format à mettre à jour', description: 'Ancienne description' });

    //     const response = await request(app)
    //         .put(`/formats/${formatId}`)
    //         .send({ name: 'Format Mis à Jour', description: 'Description mise à jour' });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', formatId);
    //     expect(response.body.name).toBe('Format Mis à Jour');
    //     expect(response.body.description).toBe('Description mise à jour');
    // });

    // it('devrait supprimer un format', async () => {
    //     await ProductFormat.create({ id: formatId, name: 'Format à supprimer', description: 'Description à supprimer' });

    //     const response = await request(app).delete(`/formats/${formatId}`);

    //     expect(response.status).toBe(204);

    //     const format = await ProductFormat.findByPk(formatId);
    //     expect(format).toBeNull();
    // });

    // it('ne devrait pas supprimer un format si des produits sont associés', async () => {
    //     const format = await ProductFormat.create({ id: formatId, name: 'Format associé', description: 'Description associée' });
    //     await Product.create({
    //         name: 'Produit Test',
    //         description: 'Description du produit',
    //         price: 10.99,
    //         formatId: formatId,
    //         genreId: uuidv4(),
    //         artistId: uuidv4()
    //     });

    //     const response = await request(app).delete(`/formats/${formatId}`);

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'Vous ne pouvez pas supprimer un format qui est encore associé a des produits.');
    // });
});
