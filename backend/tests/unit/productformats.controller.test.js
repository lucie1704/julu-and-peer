const productFormatController = require('../../controllers/productFormatController');
const { ProductFormat } = require('../../models');

jest.mock('../../models', () => ({
    Format: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des formats', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouveau genre', async () => {
        const req = { body: { name: 'Nouveau Format', description: 'Format physique' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const newFormat = { id: 1, ...req.body };
        ProductFormat.create.mockResolvedValue(newFormat);

        await productFormatController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newFormat);
    });
});