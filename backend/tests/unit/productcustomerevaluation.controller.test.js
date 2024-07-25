const productCustomerEvaluationController = require('../../controllers/productCustomerEvaluationController');
const { ProductCustomerEvaluation } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    ProductCustomerEvaluation: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des évaluations des clients sur les produits', () => {
    let res;
    
    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('devrait obtenir toutes les évaluations', async () => {
        const req = {};
        const evaluations = [{ id: 1, comment: 'Excellent!' }, { id: 2, comment: 'Not bad!' }];
        ProductCustomerEvaluation.findAll.mockResolvedValue(evaluations);

        await productCustomerEvaluationController.getAll(req, res);

        expect(ProductCustomerEvaluation.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(evaluations);
    });

    it('devrait obtenir une évaluation par ID', async () => {
        const req = { params: { id: '12345' } };
        const evaluation = { id: '12345', comment: 'Good product!' };
        ProductCustomerEvaluation.findByPk.mockResolvedValue(evaluation);

        await productCustomerEvaluationController.getById(req, res);

        expect(ProductCustomerEvaluation.findByPk).toHaveBeenCalledWith('12345');
        expect(res.json).toHaveBeenCalledWith(evaluation);
    });

    it('devrait créer une nouvelle évaluation', async () => {
        const req = { body: { comment: 'Great product!' } };
        const newEvaluation = { id: 'new-id', comment: 'Great product!' };
        ProductCustomerEvaluation.create.mockResolvedValue(newEvaluation);

        await productCustomerEvaluationController.create(req, res);

        expect(ProductCustomerEvaluation.create).toHaveBeenCalledWith({ id: expect.any(String), ...req.body });
        expect(res.json).toHaveBeenCalledWith(newEvaluation);
    });

    it('devrait mettre à jour une évaluation', async () => {
        const req = { params: { id: '12345' }, body: { comment: 'Updated comment!' } };
        const updatedEvaluation = { id: '12345', comment: 'Updated comment!' };
        ProductCustomerEvaluation.update.mockResolvedValue([1, [updatedEvaluation]]);

        await productCustomerEvaluationController.update(req, res);

        expect(ProductCustomerEvaluation.update).toHaveBeenCalledWith(req.body, {
            where: { id: '12345' },
            returning: true,
        });
        expect(res.json).toHaveBeenCalledWith(updatedEvaluation);
    });

    it('ne devrait pas mettre à jour une évaluation si elle n’existe pas', async () => {
        const req = { params: { id: '12345' }, body: { comment: 'Updated comment!' } };
        const next = jest.fn();
        ProductCustomerEvaluation.update.mockResolvedValue([0, []]);

        await productCustomerEvaluationController.update(req, {}, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('devrait supprimer une évaluation', async () => {
        const req = { params: { id: '12345' } };
        ProductCustomerEvaluation.destroy.mockResolvedValue(1);

        await productCustomerEvaluationController.delete(req, res);

        expect(ProductCustomerEvaluation.destroy).toHaveBeenCalledWith({
            where: { id: '12345' },
        });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer une évaluation si elle n’existe pas', async () => {
        const req = { params: { id: '12345' } };
        const next = jest.fn();
        ProductCustomerEvaluation.destroy.mockResolvedValue(0);

        await productCustomerEvaluationController.delete(req, {}, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
});
