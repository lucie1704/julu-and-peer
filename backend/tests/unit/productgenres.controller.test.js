const productGenreController = require('../../controllers/productGenreController');
const { ProductGenre } = require('../../models');

jest.mock('../../models', () => ({
    Genre: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des genres', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouveau genre', async () => {
        const req = { body: { name: 'Nouveau Genre', description: 'Genre spécifique musical' } };
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
});