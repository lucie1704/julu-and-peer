const productArtistController = require('../../controllers/productArtistController');
const { ProductArtist, Product } = require('../../models');

jest.mock('../../models', () => ({
    ProductArtist: {
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

describe('Tests sur le controller des artistes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouvel artiste', async () => {
        const req = { body: { name: 'Nouvel Artiste', description: 'Artiste prometteur' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const newArtist = { id: 1, ...req.body };
        ProductArtist.create.mockResolvedValue(newArtist);

        await productArtistController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newArtist);
    });

    it('devrait obtenir tous les artistes', async () => {
        const req = { query: { page: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const artists = [{ name: 'Artiste 1' }, { name: 'Artiste 2' }];
        const count = artists.length;
        ProductArtist.findAndCountAll.mockResolvedValue({ count, rows: artists });

        await productArtistController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 20,
            totalItems: count,
            totalPages: Math.ceil(count / 20),
            data: artists,
        });
    });

    it('devrait obtenir un artiste par UUID', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const artist = { name: 'Artiste 1' };
        ProductArtist.findByPk.mockResolvedValue(artist);

        await productArtistController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(artist);
    });

    it('devrait mettre à jour un artiste', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' }, body: { name: 'Artiste Mise à Jour' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const artist = {
            id: '04caec53-e49f-4574-af49-36766bdf52c9',
            name: 'Artiste Mise à Jour',
            description: 'Description mise à jour',
        };

        ProductArtist.findByPk.mockResolvedValue(artist);
        ProductArtist.update.mockResolvedValue([1, [artist]]);

        await productArtistController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('devrait supprimer un artiste', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const artist = { id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() };
    
        ProductArtist.findByPk.mockResolvedValue(artist);
        Product.count.mockResolvedValue(0);
        artist.destroy.mockResolvedValue();
    
        await productArtistController.delete(req, res);
    
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith();
    });

    it('ne devrait pas supprimer un artiste si des produits sont associés', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        ProductArtist.findByPk.mockResolvedValue({ id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() });
        Product.count.mockResolvedValue(1);
    
        await productArtistController.delete(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Vous ne pouvez pas supprimer un artiste qui est encore associé a des produits.' });
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

        await productArtistController.options(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
});