const productFormatController = require('../../controllers/productFormatController');
const { ProductFormat, Product } = require('../../models');

jest.mock('../../models', () => ({
    ProductFormat: {
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

describe('Tests sur le controller des formats', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un nouveau format', async () => {
        const req = { body: { name: 'Nouveau Format', description: 'Format prometteur' } };
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

    it('devrait obtenir tous les formats', async () => {
        const req = { query: { page: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const formats = [{ name: 'Format 1' }, { name: 'Format 2' }];
        const count = formats.length;
        ProductFormat.findAndCountAll.mockResolvedValue({ count, rows: formats });

        await productFormatController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 20,
            totalItems: count,
            totalPages: Math.ceil(count / 20),
            data: formats,
        });
    });

    it('devrait obtenir un format par UUID', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const format = { name: 'Format 1' };
        ProductFormat.findByPk.mockResolvedValue(format);

        await productFormatController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(format);
    });

    it('devrait mettre à jour un format', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' }, body: { name: 'Format Mise à Jour' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const format = {
            id: '04caec53-e49f-4574-af49-36766bdf52c9',
            name: 'Format Mise à Jour',
            description: 'Description mise à jour',
        };

        ProductFormat.findByPk.mockResolvedValue(format);
        ProductFormat.update.mockResolvedValue([1, [format]]);

        await productFormatController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(format);
    });

    it('devrait supprimer un format', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const format = { id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() };

        ProductFormat.findByPk.mockResolvedValue(format);
        Product.count.mockResolvedValue(0);
        format.destroy.mockResolvedValue();

        await productFormatController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });

    it('ne devrait pas supprimer un format si des produits sont associés', async () => {
        const req = { params: { id: '04caec53-e49f-4574-af49-36766bdf52c9' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProductFormat.findByPk.mockResolvedValue({ id: '04caec53-e49f-4574-af49-36766bdf52c9', destroy: jest.fn() });
        Product.count.mockResolvedValue(1);

        await productFormatController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Vous ne pouvez pas supprimer un format qui est encore associé a des produits.' });
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

        await productFormatController.options(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
});
