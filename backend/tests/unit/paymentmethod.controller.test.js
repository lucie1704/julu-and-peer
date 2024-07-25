const paymentMethodController = require('../../controllers/paymentMethodController');
const { PaymentMethod } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    PaymentMethod: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des méthodes de paiement', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait obtenir toutes les méthodes de paiement', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const paymentMethods = [{ id: '1', method: 'Credit Card' }, { id: '2', method: 'PayPal' }];
        PaymentMethod.findAll.mockResolvedValue(paymentMethods);

        await paymentMethodController.getAll(req, res);

        expect(PaymentMethod.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(paymentMethods);
    });

    it('devrait obtenir une méthode de paiement par ID', async () => {
        const req = { params: { id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        const paymentMethod = { id: '1', method: 'Credit Card' };
        PaymentMethod.findByPk.mockResolvedValue(paymentMethod);

        await paymentMethodController.getById(req, res, next);

        expect(PaymentMethod.findByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(paymentMethod);
    });

    it('ne devrait pas obtenir une méthode de paiement si elle n\'existe pas', async () => {
        const req = { params: { id: '1' } };
        const res = {};
        const next = jest.fn();

        PaymentMethod.findByPk.mockResolvedValue(null);

        await paymentMethodController.getById(req, res, next);

        expect(PaymentMethod.findByPk).toHaveBeenCalledWith('1');
        expect(next).toHaveBeenCalledWith(new AppError(404));
    });

    it('devrait créer une nouvelle méthode de paiement', async () => {
        const req = { body: { method: 'Credit Card' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const newPaymentMethod = { id: '1', method: 'Credit Card' };
        PaymentMethod.create.mockResolvedValue(newPaymentMethod);

        await paymentMethodController.create(req, res);

        expect(PaymentMethod.create).toHaveBeenCalledWith({ id: expect.any(String), ...req.body });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newPaymentMethod);
    });

    it('devrait mettre à jour une méthode de paiement', async () => {
        const req = { params: { id: '1' }, body: { method: 'Updated Method' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        const updatedPaymentMethod = { id: '1', method: 'Updated Method' };
        PaymentMethod.update.mockResolvedValue([1, [updatedPaymentMethod]]);

        await paymentMethodController.update(req, res, next);

        expect(PaymentMethod.update).toHaveBeenCalledWith(req.body, { where: { id: '1' }, returning: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedPaymentMethod);
    });

    it('ne devrait pas mettre à jour une méthode de paiement si elle n\'existe pas', async () => {
        const req = { params: { id: '1' }, body: { method: 'Updated Method' } };
        const res = {};
        const next = jest.fn();

        PaymentMethod.update.mockResolvedValue([0]);

        await paymentMethodController.update(req, res, next);

        expect(PaymentMethod.update).toHaveBeenCalledWith(req.body, { where: { id: '1' }, returning: true });
        expect(next).toHaveBeenCalledWith(new AppError(404));
    });

    it('devrait supprimer une méthode de paiement', async () => {
        const req = { params: { id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();

        PaymentMethod.destroy.mockResolvedValue(1);

        await paymentMethodController.delete(req, res, next);

        expect(PaymentMethod.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer une méthode de paiement si elle n\'existe pas', async () => {
        const req = { params: { id: '1' } };
        const res = {};
        const next = jest.fn();

        PaymentMethod.destroy.mockResolvedValue(0);

        await paymentMethodController.delete(req, res, next);

        expect(PaymentMethod.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(next).toHaveBeenCalledWith(new AppError(404));
    });
});
