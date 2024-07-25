const productGenreController = require('../../controllers/productGenreController');
const { ProductGenre, Product } = require('../../models');

jest.mock('../../models', () => ({
    ProductGenre: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
        findAndCountAll: jest.fn(),
        update: jest.fn(),
    },
    Product: {
        count: jest.fn(),
    },
}));

describe('Tests sur le controller des genres', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouveau genre', async () => {
        const req = { body: { name: 'Nouveau Genre', description: 'Genre prometteur' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const newGenre = { id: 1, ...req.body };
        ProductGenre.create.mockResolvedValue(newGenre);

        await productGenreController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newGenre);
    });

    it('devrait obtenir tous les genres', async () => {
        const req = { query: { page: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const genres = [{ name: 'Genre 1' }, { name: 'Genre 2' }];
        const count = genres.length;
        ProductGenre.findAndCountAll.mockResolvedValue({ count, rows: genres });

        await productGenreController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 20,
            totalItems: count,
            totalPages: Math.ceil(count / 20),
            data: genres,
        });
    });

    it('devrait obtenir un genre par UUID', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const genre = { name: 'Genre 1' };
        ProductGenre.findByPk.mockResolvedValue(genre);

        await productGenreController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(genre);
    });

    it('devrait mettre à jour un genre', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' }, body: { name: 'Genre Mise à Jour' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const genre = {
            id: '04caec53-e49f-4574-af49-36766bdf52c9',
            name: 'Genre Mise à Jour',
            description: 'Description mise à jour',
        };

        ProductGenre.findByPk.mockResolvedValue(genre);
        ProductGenre.update.mockResolvedValue([1, [genre]]);

        await productGenreController.update(req, res);

        expect(responseReturn).toHaveBeenCalledWith(res, genre);
    });

    it('devrait supprimer un genre', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const genre = { id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() };

        ProductGenre.findByPk.mockResolvedValue(genre);
        Product.count.mockResolvedValue(0);
        genre.destroy.mockResolvedValue();

        await productGenreController.delete(req, res);

        expect(responseReturn).toHaveBeenCalledWith(res, genre, 204);
    });

    it('ne devrait pas supprimer un genre si des produits sont associés', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProductGenre.findByPk.mockResolvedValue({ id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() });
        Product.count.mockResolvedValue(1);

        await productGenreController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Vous ne pouvez pas supprimer un genre qui est encore associé a des produits.' });
    });

    it('devrait retourner un objet avec des valeurs par défaut dans options', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const expectedResponse = {
            name: '',
            description: ''
        };

        await productGenreController.options(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
});
