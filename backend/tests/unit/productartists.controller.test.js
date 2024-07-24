const productArtistController = require('../../controllers/productArtistController');
const { ProductArtist } = require('../../models');

jest.mock('../../models', () => ({
    Artist: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des artistes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouveau genre', async () => {
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
});