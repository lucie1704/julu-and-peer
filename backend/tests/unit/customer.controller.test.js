const customerController = require('../../controllers/customerController');
const { User, Customer } = require('../../models');
const AppError = require('../../utils/appError');

jest.mock('../../models', () => ({
    User: {
        findByPk: jest.fn(),
    },
    Customer: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Tests sur le controller des clients', () => {
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('devrait créer un nouveau client', async () => {
        const req = { body: { userId: 'user-id', firstName: 'John', lastName: 'Doe' } };
        const user = { id: 'user-id' };
        const newCustomer = { id: 'new-id', ...req.body };

        User.findByPk.mockResolvedValue(user);
        Customer.create.mockResolvedValue(newCustomer);

        await customerController.create(req, res);

        expect(User.findByPk).toHaveBeenCalledWith('user-id');
        expect(Customer.create).toHaveBeenCalledWith({ id: expect.any(String), userId: 'user-id', firstName: 'John', lastName: 'Doe' });
        expect(res.json).toHaveBeenCalledWith(newCustomer);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('devrait obtenir tous les clients', async () => {
        const req = {};
        const customers = [{ id: '1', firstName: 'John', lastName: 'Doe' }, { id: '2', firstName: 'Jane', lastName: 'Doe' }];
        Customer.findAll.mockResolvedValue(customers);

        await customerController.getAll(req, res);

        expect(Customer.findAll).toHaveBeenCalledWith({ include: User });
        expect(res.json).toHaveBeenCalledWith(customers);
    });

    it('devrait obtenir un client par ID', async () => {
        const req = { params: { id: 'customer-id' } };
        const customer = { id: 'customer-id', firstName: 'John', lastName: 'Doe' };
        Customer.findByPk.mockResolvedValue(customer);

        await customerController.getById(req, res);

        expect(Customer.findByPk).toHaveBeenCalledWith('customer-id', { include: User });
        expect(res.json).toHaveBeenCalledWith(customer);
    });

    it('devrait obtenir un client par userId', async () => {
        const req = { params: { id: 'user-id' } };
        const customer = { id: 'customer-id', userId: 'user-id', firstName: 'John', lastName: 'Doe' };
        Customer.findOne.mockResolvedValue(customer);

        await customerController.getByUserId(req, res);

        expect(Customer.findOne).toHaveBeenCalledWith({
            where: { userId: 'user-id' },
            include: { model: User },
        });
        expect(res.json).toHaveBeenCalledWith(customer);
    });

    it('devrait mettre à jour un client', async () => {
        const req = { params: { id: 'customer-id' }, body: { firstName: 'Jane' } };
        const updatedCustomer = { id: 'customer-id', firstName: 'Jane', lastName: 'Doe' };
        Customer.update.mockResolvedValue([1]);
        Customer.findOne.mockResolvedValue(updatedCustomer);

        await customerController.update(req, res);

        expect(Customer.update).toHaveBeenCalledWith(req.body, { where: { id: 'customer-id' } });
        expect(Customer.findOne).toHaveBeenCalledWith({
            where: { id: 'customer-id' },
            include: { model: User },
        });
        expect(res.json).toHaveBeenCalledWith(updatedCustomer);
    });

    it('ne devrait pas mettre à jour un client si aucun enregistrement trouvé', async () => {
        const req = { params: { id: 'customer-id' }, body: { firstName: 'Jane' } };
        const next = jest.fn();
        Customer.update.mockResolvedValue([0]);

        await customerController.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('devrait supprimer un client', async () => {
        const req = { params: { id: 'customer-id' } };
        Customer.destroy.mockResolvedValue(1);

        await customerController.delete(req, res);

        expect(Customer.destroy).toHaveBeenCalledWith({ where: { id: 'customer-id' } });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('ne devrait pas supprimer un client si aucun enregistrement trouvé', async () => {
        const req = { params: { id: 'customer-id' } };
        const next = jest.fn();
        Customer.destroy.mockResolvedValue(0);

        await customerController.delete(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
});
